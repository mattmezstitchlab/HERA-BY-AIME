import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { seedDefaultComposition } from "@/lib/seedComposition";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useWedding } from "@/hooks/useWedding";
import { applySmartFilter, momentFit, slotSchedule, songSeconds } from "@/lib/hera";
import IntentionsSprint from "@/components/hera/composition/IntentionsSprint";
import TrackCard from "@/components/hera/TrackCard";
import MomentHeader from "@/components/hera/composition/MomentHeader";
import MomentDialog from "@/components/hera/MomentDialog";
import HealthStrip from "@/components/hera/composition/HealthStrip";
import CompositionToolbar from "@/components/hera/composition/CompositionToolbar";
import ListView from "@/components/hera/composition/ListView";
import PersonPanel from "@/components/hera/PersonPanel";
import GeneratorDialog from "@/components/hera/generator/GeneratorDialog";
import { base44 } from "@/api/base44Client";
import { GripVertical, Plus, Sparkles } from "lucide-react";

export default function Composition() {
  const { items, moments, songById, momentById, people, refresh, patchItems, setWizardOpen, weddingId } = useWedding();
  const [searchParams, setSearchParams] = useSearchParams();
  const [seeding, setSeeding] = useState(false);
  const [view, setView] = useState("timeline");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(searchParams.get("filter") || null);
  const [momentDialog, setMomentDialog] = useState(null); // null | { moment }
  const [personPanelOpen, setPersonPanelOpen] = useState(false);
  const [sprintOpen, setSprintOpen] = useState(false);
  const [generatorOpen, setGeneratorOpen] = useState(false);

  const ambiance = searchParams.get("ambiance");
  const personId = searchParams.get("person");

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const installReference = async () => {
    setSeeding(true);
    await seedDefaultComposition(weddingId, moments);
    refresh();
    setSeeding(false);
  };

  // ——— Filtrage ———
  let visible = applySmartFilter(items, filter);
  if (ambiance) visible = visible.filter((i) => (i.atmosphere || []).includes(ambiance));
  if (personId) visible = visible.filter((i) => i.person_id === personId);
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    visible = visible.filter((i) => {
      const s = songById[i.song_id];
      return s && ((s.title || "").toLowerCase().includes(q) || (s.artist || "").toLowerCase().includes(q));
    });
  }
  const filterActive = !!filter || !!ambiance || !!personId || !!query.trim();

  const sorted = (list) => [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
  const groupFor = (momentId) => sorted(visible.filter((i) => (i.music_moment_id || "none") === momentId));

  // ——— Santé de la composition ———
  const totalSec = items.reduce((s, i) => s + songSeconds(songById[i.song_id]), 0);
  const emptyMoments = moments.filter((m) => !items.some((i) => i.music_moment_id === m.id)).length;
  const withoutReason = items.filter((i) => !i.reason).length;
  // Tenue horaire : un moment dont la musique dépasse le créneau annoncé
  const fitByMoment = {};
  moments.forEach((m) => {
    fitByMoment[m.id] = momentFit(m, items.filter((i) => i.music_moment_id === m.id), songById);
  });
  const overflowMoments = moments.filter((m) => fitByMoment[m.id]?.state === "overflow").length;

  // Heure de passage réelle de chaque morceau, calculée sur la composition
  // complète : la vue Liste garde le repère horaire de la vue chronologique.
  const timeById = {};
  moments.forEach((m) => {
    const list = sorted(items.filter((i) => i.music_moment_id === m.id));
    slotSchedule(m.start_time, list, songById).times.forEach((t, idx) => {
      if (t) timeById[list[idx].id] = t;
    });
  });

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const srcList = groupFor(source.droppableId);
    const moved = srcList[source.index];
    const destMomentId = destination.droppableId === "none" ? null : destination.droppableId;
    const sameList = source.droppableId === destination.droppableId;
    const destList = sameList ? srcList : groupFor(destination.droppableId);

    const newSrc = [...srcList];
    newSrc.splice(source.index, 1);
    const newDest = sameList ? newSrc : [...destList];
    newDest.splice(destination.index, 0, moved);

    const updates = [];
    newDest.forEach((it, idx) =>
      updates.push({ id: it.id, order: idx, ...(it.id === moved.id ? { music_moment_id: destMomentId } : {}) })
    );
    if (!sameList) newSrc.forEach((it, idx) => updates.push({ id: it.id, order: idx }));

    // Mise à jour optimiste
    const byId = Object.fromEntries(updates.map((u) => [u.id, u]));
    patchItems((old) =>
      old.map((i) => (byId[i.id] ? { ...i, order: byId[i.id].order, music_moment_id: "music_moment_id" in byId[i.id] ? byId[i.id].music_moment_id : i.music_moment_id } : i))
    );

    await base44.entities.PlaylistItem.bulkUpdate(updates);
    refresh();
  };

  const Section = ({ id, title, moment, list }) => {
    const { times, endTime, totalSec: sectionSec } = slotSchedule(moment?.start_time, list, songById);
    return (
      <section id={id} className="hera-timeline">
        <div className="tl-line" />
        <div className="hera-tl-dot" style={{ left: 0, top: 6 }} />
        <MomentHeader
          moment={moment}
          title={title}
          startTime={moment?.start_time}
          endTime={endTime}
          totalSec={sectionSec}
          count={list.length}
          fit={moment ? fitByMoment[moment.id] : null}
          onEdit={() => setMomentDialog({ moment })}
        />
        <Droppable droppableId={id} isDropDisabled={filterActive}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-2 pb-8 rounded-lg transition-colors min-h-[44px] ${snapshot.isDraggingOver ? "bg-secondary/60" : ""}`}
            >
              {list.length === 0 && !snapshot.isDraggingOver && (
                <p className="text-xs text-muted-foreground italic py-2">Aucun morceau — glissez-en un ici.</p>
              )}
              {list.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={filterActive}>
                  {(prov, snap) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      className={`flex items-center gap-1 ${snap.isDragging ? "opacity-90 rotate-1" : ""}`}
                    >
                      {!filterActive && (
                        <div {...prov.dragHandleProps} className="p-1 text-border hover:text-muted-foreground cursor-grab shrink-0">
                          <GripVertical className="w-4 h-4" />
                        </div>
                      )}
                      {times[index] && (
                        <p className="w-11 shrink-0 text-[11px] tabular-nums text-muted-foreground">{times[index]}</p>
                      )}
                      <div className="flex-1 min-w-0">
                        <TrackCard item={item} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Composition</h1>
          <p className="text-sm text-muted-foreground mt-1">La timeline réelle de votre journée, morceau par morceau.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="brand-btn-dark" onClick={() => setGeneratorOpen(true)}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /> Générer
          </button>
          <button className="brand-btn" onClick={() => setMomentDialog({ moment: null })}>
            <Plus className="w-3.5 h-3.5" strokeWidth={2} /> Moment
          </button>
        </div>
      </div>

      <HealthStrip
        count={items.length}
        totalSec={totalSec}
        emptyMoments={emptyMoments}
        withoutReason={withoutReason}
        overflowMoments={overflowMoments}
        onShowWithoutReason={() => setSprintOpen(true)}
      />

      <CompositionToolbar
        view={view}
        setView={setView}
        query={query}
        setQuery={setQuery}
        personId={personId}
        setPersonId={(id) => setParam("person", id)}
        filter={filter}
        setFilter={setFilter}
        ambiance={ambiance}
        clearAmbiance={() => setParam("ambiance", null)}
        people={people}
        onOpenPerson={() => setPersonPanelOpen(true)}
      />

      {filterActive && view === "timeline" && (
        <p className="text-[11px] text-muted-foreground mb-4">Le glisser-déposer est désactivé pendant le filtrage.</p>
      )}

      {seeding && (
        <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
          <div className="w-4 h-4 border-2 border-border border-t-foreground rounded-full animate-spin" />
          Installation de la composition de référence…
        </div>
      )}

      {view === "timeline" ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-2">
            {moments.map((m) => (
              <Section key={m.id} id={m.id} title={m.name} moment={m} list={groupFor(m.id)} />
            ))}
            <Section id="none" title="Sans moment" moment={null} list={groupFor("none")} />
          </div>
        </DragDropContext>
      ) : (
        <ListView list={sorted(visible)} momentById={momentById} timeById={timeById} />
      )}

      {items.length === 0 && !seeding && (
        <div className="text-center py-10 space-y-3">
          <button onClick={() => setWizardOpen(true)} className="brand-btn-dark">
            Ajouter votre premier morceau
          </button>
          <p>
            <button onClick={installReference} className="text-sm underline underline-offset-4 text-muted-foreground">
              ou installer la composition de référence
            </button>
          </p>
        </div>
      )}

      <MomentDialog
        open={!!momentDialog}
        onOpenChange={(o) => !o && setMomentDialog(null)}
        moment={momentDialog?.moment || null}
      />

      <IntentionsSprint open={sprintOpen} onOpenChange={setSprintOpen} />

      <GeneratorDialog open={generatorOpen} onOpenChange={setGeneratorOpen} />

      <PersonPanel personId={personPanelOpen ? personId : null} onClose={() => setPersonPanelOpen(false)} />
    </div>
  );
}
