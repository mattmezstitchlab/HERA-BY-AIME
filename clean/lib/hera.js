export const AMBIANCES = [
  { id: "emotion", label: "Émotion" },
  { id: "romantique", label: "Romantique" },
  { id: "elegant", label: "Élégant" },
  { id: "familial", label: "Familial" },
  { id: "nostalgique", label: "Nostalgique" },
  { id: "festif", label: "Festif" },
  { id: "energique", label: "Énergique" },
  { id: "chill", label: "Chill" },
  { id: "dansant", label: "Dansant" },
  { id: "surprise", label: "Surprise" },
  { id: "ceremonie", label: "Cérémonie" },
  { id: "afterparty", label: "Afterparty" },
];
export const ambianceLabel = (id) => AMBIANCES.find(a => a.id === id)?.label || id;
export const PRIORITIES = {
  normal: { label: "Normal", badge: "brand-tag" },
  important: { label: "Important", badge: "brand-tag !text-foreground" },
  incontournable: { label: "Incontournable", badge: "brand-tag-dark" },
  interdit: { label: "Interdit", badge: "brand-tag line-through" },
};
export const STATUSES = {
  "proposé": { label: "Proposé", badge: "brand-tag" },
  "validé": { label: "Validé", badge: "brand-tag-status" },
  "planifié": { label: "Planifié", badge: "brand-tag !bg-transparent border" },
};
export const STATUS_FLOW = ["proposé", "validé", "planifié"];
export const MOMENT_PRESETS = [
  { name: "Accueil", start_time: "09:30", end_time: "11:30" },
  { name: "Cérémonie", start_time: "12:00", end_time: "13:00" },
  { name: "Cocktail", start_time: "14:00", end_time: "18:00" },
  { name: "Dîner", start_time: "19:00", end_time: "21:30" },
  { name: "Ouverture de bal", start_time: "21:30", end_time: "22:00" },
  { name: "Soirée", start_time: "22:00", end_time: "00:00" },
  { name: "Afterparty", start_time: "00:00", end_time: "03:00" },
];
export function personName(p){ if(!p) return null; return p.display_name || [p.first_name,p.last_name].filter(Boolean).join(" "); }
export const DEFAULT_SONG_SECONDS = 210;
export function songSeconds(song){ const m=/^(\d{1,2}):([0-5]\d)$/.exec((song?.duration||"").trim()); return m? Number(m[1])*60+Number(m[2]) : DEFAULT_SONG_SECONDS; }
export function parseClock(t){ const m=/^(\d{1,2}):([0-5]\d)/.exec((t||"").trim()); return m? Number(m[1])*60+Number(m[2]):null; }
export function formatClock(minutes){ const t=((Math.round(minutes)%1440)+1440)%1440; return `${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`; }
export function slotSchedule(startTime, list, songById){
  let cursor=parseClock(startTime);
  const times=list.map(it=>{ if(cursor===null) return null; const at=formatClock(cursor); cursor+=songSeconds(songById[it.song_id])/60; return at; });
  const totalSec=list.reduce((s,it)=>s+songSeconds(songById[it.song_id]),0);
  return { times, endTime: cursor===null? null:formatClock(cursor), totalSec };
}
export function momentFit(moment, list, songById){
  const start=parseClock(moment?.start_time); const end=parseClock(moment?.end_time);
  const musicSec=list.reduce((s,it)=>s+songSeconds(songById[it.song_id]),0);
  if(start===null||end===null) return { state:"unknown", musicSec, capacitySec:null, deltaSec:0 };
  let capacityMin=end-start; if(capacityMin<0) capacityMin+=1440;
  const capacitySec=capacityMin*60; const deltaSec=musicSec-capacitySec;
  if(deltaSec>0) return { state:"overflow", musicSec, capacitySec, deltaSec };
  if(-deltaSec>300) return { state:"gap", musicSec, capacitySec, deltaSec };
  return { state:"ok", musicSec, capacitySec, deltaSec };
}
export const SMART_FILTERS = [
  { id:"a_valider", label:"À valider" },{ id:"incontournables", label:"Incontournables" },
  { id:"interdits", label:"Interdits" },{ id:"sans_moment", label:"Sans moment" },
  { id:"sans_personne", label:"Sans personne" },{ id:"sans_raison", label:"Sans raison" },
  { id:"avec_souvenir", label:"Avec souvenir" },
];
export function applySmartFilter(items, filterId){
  if(!filterId) return items;
  switch(filterId){
    case "a_valider": return items.filter(i=>i.status==="proposé");
    case "incontournables": return items.filter(i=>i.priority==="incontournable");
    case "interdits": return items.filter(i=>i.priority==="interdit");
    case "sans_moment": return items.filter(i=>!i.music_moment_id);
    case "sans_personne": return items.filter(i=>!i.person_id);
    case "sans_raison": return items.filter(i=>!i.reason);
    case "avec_souvenir": return items.filter(i=>i.memory);
    default: return items;
  }
}
