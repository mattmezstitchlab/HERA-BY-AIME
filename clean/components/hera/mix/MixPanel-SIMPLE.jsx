// MixPanel-SIMPLE.jsx — remplace MixPanel.jsx
// Ajoute le bouton groupé sous ValidationCard

import React from "react";
import { useWedding } from "@/hooks/useWedding";
import { useMixEngine } from "@/hooks/useMixEngine";
import MixSettings from "@/components/hera/mix/MixSettings";
import MixTrackRow from "@/components/hera/mix/MixTrackRow";
import ValidationCard from "@/components/hera/validation/ValidationCard";
import BulkBuyButton from "@/components/hera/mix/BulkBuyButton";
import { Play, Pause, SkipForward, SkipBack, Square, ChevronDown, X } from "lucide-react";

const fmt = (s) => {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function MixPanelSimple() {
  const { items, songById, wedding } = useWedding();
  const mix = useMixEngine();
  const [collapsed, setCollapsed] = React.useState(false);
  const [onlyMissing, setOnlyMissing] = React.useState(false);

  if (!mix.panelOpen) return null;

  const ordered = items.filter((i) => i.priority !== "interdit").sort((a, b) => (a.order || 0) - (b.order || 0));
  const playable = ordered.filter((i) => i.audio_url);
  const missing = ordered.filter((i) => !i.audio_url);
  const song = mix.current ? songById[mix.current.song_id] : null;
  const progress = mix.duration ? Math.min(100, (mix.position / mix.duration) * 100) : 0;

  const play = (i) => {
    const start = playable.findIndex((p) => p.id === i.id);
    mix.start(playable, Math.max(0, start));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card shadow-[var(--brand-shadow-hud)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-3">
        {/* Transport */}
        <div className="flex items-center gap-3">
          <button
            className="brand-btn-dark !px-4"
            onClick={() => (mix.playing ? mix.pause() : mix.index >= 0 ? mix.resume() : mix.start(playable, 0))}
            disabled={!playable.length || !wedding?.validated}
          >
            {mix.playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {mix.playing ? "Pause" : "Jouer la composition"}
          </button>
          <button className="brand-icon-btn !w-9 !h-9" onClick={() => mix.goTo(Math.max(0, mix.index - 1))} disabled={mix.index <= 0}><SkipBack className="w-4 h-4" /></button>
          <button className="brand-icon-btn !w-9 !h-9" onClick={() => mix.goTo(mix.index + 1)} disabled={mix.index < 0 || mix.index >= playable.length - 1}><SkipForward className="w-4 h-4" /></button>
          <button className="brand-icon-btn !w-9 !h-9" onClick={mix.stop}><Square className="w-3.5 h-3.5" /></button>

          <div className="min-w-0 flex-1 hidden sm:block">
            <p className="text-sm truncate">{song ? `${song.title} — ${song.artist}` : `${playable.length} morceau(x) prêt(s) sur ${ordered.length}`}</p>
            <div className="mt-1 h-1 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${progress}%` }} /></div>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">{fmt(mix.position)} / {fmt(mix.duration)}</span>
          <button className="brand-icon-btn !w-9 !h-9" onClick={() => setCollapsed((c) => !c)}><ChevronDown className={`w-4 h-4 ${collapsed ? "rotate-180" : ""}`} /></button>
          <button className="brand-icon-btn !w-9 !h-9" onClick={() => { mix.stop(); mix.setPanelOpen(false); }}><X className="w-4 h-4" /></button>
        </div>

        {!collapsed && (
          <div className="mt-4 border-t border-border pt-4 space-y-3">
            <ValidationCard />
            {/* BOUTON GROUPÉ SIMPLE — visible seulement après validation */}
            {wedding?.validated && missing.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <BulkBuyButton items={items} songById={songById} />
                <span className="text-xs text-muted-foreground">ou achète titre par titre avec le bouton "Acheter" de chaque ligne</span>
              </div>
            )}
            <MixSettings settings={mix.settings} setSettings={mix.setSettings} />
            <div className="flex items-center gap-3">
              <span className="brand-stat-pill">{playable.length}/{ordered.length} fichiers importés</span>
              {missing.length > 0 && <button className="brand-btn !py-2" onClick={() => setOnlyMissing((v) => !v)}>{onlyMissing ? "Tout afficher" : `${missing.length} à importer`}</button>}
            </div>
            <div className="max-h-[38vh] overflow-y-auto divide-y divide-border">
              {(onlyMissing ? missing : ordered).map((i) => <MixTrackRow key={i.id} item={i} active={mix.current?.id === i.id} onPlay={() => play(i)} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
