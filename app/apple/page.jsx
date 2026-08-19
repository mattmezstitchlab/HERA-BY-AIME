"use client";
import { useState } from "react";
import { MeshGradient } from '@paper-design/shaders-react';
import { CreditCard, MessageCircle, RefreshCw } from 'lucide-react';

export default function AppleSimple() {
  const [step, setStep] = useState(1);
  const [rsvp, setRsvp] = useState({ name: "", presence: "oui", allergene: "", message: "" });
  const [tracks, setTracks] = useState([{title:"", artist:""}, {title:"", artist:""}, {title:"", artist:""}]);
  const [liveOpen, setLiveOpen] = useState(false);
  const [liveTracks, setLiveTracks] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [autoDJ, setAutoDJ] = useState(true);

  const initialMoments = [
    { time:"09:30", title:"ACCUEIL", end:"11:30", prestas:[
      {role:"Hôte d'accueil", name:"Camille & Alex", horaire:"09:30-11:30"},
      {role:"Fleuriste", name:"Maison Lemoine", horaire:"09:00-12:00"},
      {role:"Photographe", name:"Studio Lumière", horaire:"09:30-10:00"},
    ], list:[
      {t:"Un peu de rêve", a:"Vitaa", bpm:98, style:"Chill"},
      {t:"Here Comes the Sun", a:"The Beatles", bpm:128, style:"Chill"},
    ]},
    {time:"14:00", title:"COCKTAIL", end:"18:00", prestas:[
      {role:"Traiteur", name:"Maison Doucet", horaire:"14:00-18:00"},
      {role:"Saxophoniste", name:"Jules · Live", horaire:"15:00-17:00"},
      {role:"Bar", name:"Bar à spritz", horaire:"14:30-18:00"},
    ], list:[
      {t:"La vie en rose", a:"Édith Piaf", bpm:72, style:"Élégant"},
    ]},
    {time:"19:00", title:"DÎNER", end:"21:30", prestas:[
      {role:"Traiteur", name:"Service à l'assiette", horaire:"19:00-21:30"},
      {role:"Maître d'hôtel", name:"Équipe Doucet", horaire:"19:00-21:30"},
    ], list:[
      {t:"Je l'aime à mourir", a:"Francis Cabrel", bpm:82, style:"Nostalgique"},
    ]},
    {time:"21:30", title:"OUVERTURE DE BAL", end:"22:00", prestas:[
      {role:"DJ", name:"HERA Auto-DJ", horaire:"21:30-00:00"},
      {role:"Lumière", name:"Piste centrale", horaire:"21:30-22:00"},
    ], list:[
      {t:"Perfect", a:"Ed Sheeran", bpm:95, style:"Émotion"},
    ]},
    {time:"22:00", title:"SOIRÉE", end:"00:00", prestas:[
      {role:"DJ", name:"HERA Auto-DJ", horaire:"22:00-00:00"},
      {role:"Bar", name:"Open bar", horaire:"22:00-00:00"},
      {role:"Sécurité", name:"Agent", horaire:"22:00-02:00"},
    ], list:[
      {t:"September", a:"Earth, Wind & Fire", bpm:126, style:"Festif"},
      {t:"Le Freak", a:"Chic", bpm:120, style:"Dansant"},
      {t:"Billie Jean", a:"Michael Jackson", bpm:117, style:"Dansant"},
      {t:"Dancing Queen", a:"ABBA", bpm:100, style:"Festif"},
      {t:"Voyage voyage", a:"Desireless", bpm:122, style:"Énergique"},
      {t:"Wannabe", a:"Spice Girls", bpm:110, style:"Festif"},
      {t:"I Will Survive", a:"Gloria Gaynor", bpm:117, style:"Énergique"},
      {t:"Alors on danse", a:"Stromae", bpm:120, style:"Dansant"},
      {t:"Uptown Funk", a:"Mark Ronson & Bruno Mars", bpm:115, style:"Festif"},
      {t:"Waka Waka", a:"Shakira", bpm:127, style:"Énergique"},
      {t:"Levels", a:"Avicii", bpm:126, style:"Énergique"},
      {t:"Blinding Lights", a:"The Weeknd", bpm:171, style:"Dansant"},
      {t:"Djadja", a:"Aya Nakamura", bpm:95, style:"Festif"},
    ]},
  ];
  const [moments, setMoments] = useState(initialMoments);
  const [fillMsg, setFillMsg] = useState("");
  const [flippedPresta, setFlippedPresta] = useState(null);
  const [momentMedia, setMomentMedia] = useState({}); // { "ACCUEIL": [{id, type, url}] }
  const [flipped, setFlipped] = useState(null);

  const addMedia = (momentTitle) => {
    const id = Date.now();
    const isVideo = Math.random() > 0.5;
    const newItem = { id, type: isVideo? "video":"photo", url: `https://picsum.photos/seed/${momentTitle+id}/80/80` };
    setMomentMedia(prev=> ({...prev, [momentTitle]: [...(prev[momentTitle]||[]), newItem]}));
  };
  const handleMediaSelect = (e, momentTitle) => {
    const file = e.target.files?.[0];
    if(!file) return;
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video":"photo";
    setMomentMedia(prev=> ({...prev, [momentTitle]: [...(prev[momentTitle]||[]), {id: Date.now(), type, url}]}));
    e.target.value="";
  };

  const fillGaps = () => {
    // Pool intelligent sans doublon
    const pool = [
      {t:"Get Lucky", a:"Daft Punk", bpm:116, style:"Festif"},
      {t:"Titanium", a:"David Guetta & Sia", bpm:126, style:"Énergique"},
      {t:"Bella ciao", a:"Traditionnel", bpm:100, style:"Festif"},
      {t:"Sweet Caroline", a:"Neil Diamond", bpm:126, style:"Festif"},
      {t:"Y.M.C.A.", a:"Village People", bpm:128, style:"Dansant"},
      {t:"Les Lacs du Connemara", a:"Michel Sardou", bpm:128, style:"Festif"},
    ];
    const existing = new Set(moments.flatMap(m=>m.list.map(x=>x.t.toLowerCase())));
    const toAdd = pool.filter(p=>!existing.has(p.t.toLowerCase())).slice(0,3);
    if(toAdd.length===0){ setFillMsg("Aucun creux — tout est déjà complet, aucun doublon ajouté."); return; }
    setMoments(prev=> prev.map(m=> m.title==="SOIRÉE" ? {...m, list:[...m.list, ...toAdd]} : m));
    setFillMsg(`+${toAdd.length} titres ajoutés en SOIRÉE sans doublon — synchro BPM auto.`);
    setTimeout(()=>setFillMsg(""), 4000);
  };

  const addLive = () => {
    const title = document.getElementById("liveTitle")?.value;
    if(!title) return;
    // Auto placement : on l'insère de façon cohérente (ex: BPM proche, style)
    const bpm = 90 + Math.floor(Math.random()*30);
    setLiveTracks([...liveTracks, {title, artist:"Invité · live", bpm, style:"Festif", time:"22:14"}]);
    document.getElementById("liveTitle").value="";
  };

  return (
    <div style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, system-ui", background:"#000", color:"#111", minHeight:"100vh"}}>
      <style>{`input,textarea,button{font-family:inherit} ::-webkit-scrollbar{display:none}`}</style>

      <div style={{maxWidth:430, margin:"0 auto", background:"#fcfcf9", minHeight:"100vh", position:"relative", overflow:"hidden", boxShadow:"0 0 0 1px #eee, 0 40px 80px rgba(0,0,0,0.15)"}}>
        <div style={{position:"absolute", top:8, left:"50%", transform:"translateX(-50%)", width:96, height:28, background:"#000", borderRadius:999, zIndex:50}} />

        <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 16px 12px", background:"rgba(255,255,255,0.8)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:20, borderBottom:"1px solid rgba(0,0,0,0.06)"}}>
          <div style={{fontWeight:800,letterSpacing:"-0.04em",fontSize:16}}>HERA <span style={{fontWeight:300}}>by Aime®</span></div>
          <span style={{fontSize:11,background:"#111",color:"#fff",padding:"6px 10px",borderRadius:999,fontWeight:600}}>Auto · Rappel · Confiance</span>
        </header>

        {/* HERO SIMPLE */}
        <div style={{position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0}}>
            <MeshGradient speed={0.3} scale={1.1} distortion={0.7} swirl={0.06} colors={['#FF3B7F', '#00C2FF', '#7B61FF', '#FF8A00']} style={{height:"100%",width:"100%"}} />
            <div style={{position:"absolute",inset:0, background:"linear-gradient(to bottom, transparent 30%, rgba(252,252,249,0.9) 88%)"}} />
          </div>
          <div style={{position:"relative",zIndex:1, padding:"20px 16px 16px"}}>
            <h1 style={{fontSize:32,fontWeight:900,lineHeight:0.92,letterSpacing:"-0.04em",color:"#fff"}}>Votre playlist<br/>devient le déroulé<br/><span style={{fontWeight:300,fontFamily:"serif",fontStyle:"italic"}}>de votre mariage</span></h1>
            <p style={{fontSize:13,lineHeight:1.4,color:"rgba(255,255,255,0.92)",marginTop:8,maxWidth:340}}>Chaque morceau porte son heure et son souvenir. Les invités participent, le mix se fait tout seul.</p>

            {/* ONBOARDING MOBILE — 3 étapes simples */}
            <div style={{background:"#fff",borderRadius:20,padding:14,marginTop:16,boxShadow:"0 16px 40px rgba(0,0,0,0.14)",border:"1px solid rgba(0,0,0,0.04)"}}>
              <div style={{width:36,height:4,background:"#e5e5e5",borderRadius:999,margin:"0 auto 10px"}} />
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:10,letterSpacing:"0.12em",fontWeight:800,color:"#999"}}>ÉTAPE {step}/3</span>
                <div style={{display:"flex",gap:4}}>{[1,2,3].map(i=><div key={i} style={{width:i===step?18:8,height:6,borderRadius:999,background:i<=step?"#111":"#eee"}} />)}</div>
              </div>

              {step===1 && (
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <h3 style={{fontSize:14,fontWeight:800}}>Votre journée</h3>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <div style={{background:"#f5f5f7",borderRadius:12,padding:"10px 12px"}}><div style={{fontSize:9,letterSpacing:"0.08em",color:"#999",fontWeight:700}}>PRÉNOMS</div><input defaultValue="Camille & Alex" style={{background:"transparent",border:"none",fontSize:14,fontWeight:600,width:"100%",outline:"none"}}/></div>
                    <div style={{background:"#f5f5f7",borderRadius:12,padding:"10px 12px"}}><div style={{fontSize:9,color:"#999",fontWeight:700}}>DATE</div><input defaultValue="12 juillet 2027" style={{background:"transparent",border:"none",fontSize:14,fontWeight:600,width:"100%",outline:"none"}}/></div>
                  </div>
                  <div style={{background:"#f5f5f7",borderRadius:12,padding:"10px 12px"}}><div style={{fontSize:9,color:"#999",fontWeight:700}}>HORAIRES</div><div style={{display:"flex",gap:6,marginTop:6}}><span style={{fontSize:11,background:"#111",color:"#fff",padding:"6px 10px",borderRadius:999}}>09:30 Accueil</span><span style={{fontSize:11,background:"#fff",border:"1px solid #ddd",padding:"6px 10px",borderRadius:999}}>14:00 Cocktail</span><span style={{fontSize:11,background:"#fff",border:"1px solid #ddd",padding:"6px 10px",borderRadius:999}}>21:30 Bal</span></div></div>
                </div>
              )}
              {step===2 && (
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <h3 style={{fontSize:14,fontWeight:800}}>Vos goûts</h3>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["Soul","Disco","Français","Élégant","Festif"].map((t,i)=><span key={t} style={{padding:"7px 11px",borderRadius:999,fontSize:12,fontWeight:600,background:i<2?"#111":"#f5f5f7",color:i<2?"#fff":"#111"}}>{t}</span>)}</div>
                  <textarea placeholder="Thème, ambiance, ce que vous détestez..." style={{background:"#f5f5f7",border:"1px solid #f5f5f7",padding:"10px 12px",borderRadius:12,fontSize:12,minHeight:56,width:"100%",outline:"none"}} defaultValue="On veut danser dès le dessert, rien de trop connu." />
                </div>
              )}
              {step===3 && (
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <h3 style={{fontSize:14,fontWeight:800}}>Partage invités</h3>
                  <div style={{background:"#f5f5f7",borderRadius:12,padding:12,display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:36,height:36,borderRadius:999,background:"#111",color:"#fff",display:"grid",placeItems:"center"}}>✦</div>
                    <div><div style={{fontSize:12,fontWeight:700}}>Lien RSVP + 1 à 3 morceaux</div><div style={{fontSize:11,color:"#666"}}>Allergène + horaire souhaité</div></div>
                  </div>
                  <div style={{display:"flex",gap:6}}><span style={{fontSize:11,background:"#fff",border:"1px solid #eee",padding:"6px 10px",borderRadius:999}}>Mamie 2 titres</span><span style={{fontSize:11,background:"#fff",border:"1px solid #eee",padding:"6px 10px",borderRadius:999}}>Témoins 3 titres</span></div>
                </div>
              )}

              <div style={{display:"flex",gap:8,marginTop:12}}>
                {step>1 && <button onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:"13px",borderRadius:999,border:"1px solid #ddd",background:"#fff",fontWeight:600}}>Retour</button>}
                {step<3 ? <button onClick={()=>setStep(s=>s+1)} style={{flex:2,padding:"13px",borderRadius:999,background:"#007AFF",color:"#fff",fontWeight:700,border:"none"}}>Continuer</button>
                : <button onClick={()=>{document.getElementById("timeline")?.scrollIntoView({behavior:"smooth"})}} style={{flex:2,padding:"13px",borderRadius:999,background:"#111",color:"#fff",fontWeight:800,border:"none"}}>✦ Générer la timeline</button>}
              </div>
            </div>
          </div>
        </div>

        {/* RSVP — participation */}
        <div style={{padding:"14px 16px", background:"#fff", borderTop:"1px solid #eee", borderBottom:"1px solid #eee", display:"flex",gap:8,alignItems:"center"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:800,letterSpacing:"0.02em"}}>LES INVITÉS PARTICIPENT</div>
            <div style={{fontSize:11,color:"#666"}}>RSVP + allergène + 1 à 3 morceaux avec horaire souhaité</div>
          </div>
          <button onClick={()=>setLiveOpen(!liveOpen)} style={{background: liveOpen?"#111":"#fff", color: liveOpen?"#fff":"#111", border:"1px solid #ddd", padding:"8px 12px", borderRadius:999, fontSize:12, fontWeight:700}}>{liveOpen?"Fermer":"Participer"}</button>
        </div>

        {liveOpen && (
          <div style={{margin:"12px 16px", background:"#fff", border:"1px solid #eee", borderRadius:16, padding:12}}>
            <p style={{fontSize:12,fontWeight:800}}>Votre RSVP + vos morceaux</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
              <input value={rsvp.name} onChange={e=>setRsvp({...rsvp,name:e.target.value})} placeholder="Votre nom" style={{border:"1px solid #eee",padding:"10px",borderRadius:10,fontSize:12}}/>
              <select value={rsvp.presence} onChange={e=>setRsvp({...rsvp,presence:e.target.value})} style={{border:"1px solid #eee",padding:"10px",borderRadius:10,fontSize:12}}>
                <option value="oui">Je viens ✓</option><option value="non">Absent</option>
              </select>
            </div>
            <input value={rsvp.allergene} onChange={e=>setRsvp({...rsvp,allergene:e.target.value})} placeholder="Allergène / régime" style={{border:"1px solid #eee",padding:"10px",borderRadius:10,fontSize:12, width:"100%", marginTop:8}}/>
            <div style={{marginTop:10}}>
              <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",color:"#999"}}>1 À 3 MORCEAUX + HORAIRE SOUHAITÉ</p>
              {tracks.map((_,i)=>(
                <div key={i} style={{display:"flex",gap:6,marginTop:6}}>
                  <input placeholder={`Titre ${i+1}`} value={tracks[i].title} onChange={e=>{ const n=[...tracks]; n[i].title=e.target.value; setTracks(n)}} style={{flex:2,border:"1px solid #eee",padding:"9px",borderRadius:10,fontSize:12}}/>
                  <input placeholder="Heure" style={{flex:1,border:"1px solid #eee",padding:"9px",borderRadius:10,fontSize:12}} defaultValue={i===0?"22:00":""}/>
                </div>
              ))}
            </div>
            <button onClick={()=>{ if(tracks[0].title) { setLiveTracks([...liveTracks, {title:tracks[0].title, artist:rsvp.name||"Invité", bpm:112, style:"Festif", time:"22:05"}]); setTracks([{title:"",artist:""},{title:"",artist:""},{title:"",artist:""}])} }} style={{width:"100%",marginTop:10,background:"#111",color:"#fff",padding:"11px",borderRadius:999,fontSize:12,fontWeight:700}}>Envoyer mon RSVP + morceaux</button>
            <p style={{fontSize:10,color:"#999",textAlign:"center",marginTop:6}}>Ils se placent automatiquement dans l'ordre, synchro BPM</p>
          </div>
        )}

        {/* LIVE SOIR — participatif temps réel */}
        <div style={{margin:"12px 16px", background:"#111", color:"#fff", borderRadius:16, padding:12, display:"flex",gap:10,alignItems:"center"}}>
          <div style={{width:8,height:8,borderRadius:999,background:"#00FF88",boxShadow:"0 0 8px #00FF88"}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:800}}>Live du soir</div>
            <div style={{fontSize:11,opacity:0.7}}>Tapez un morceau → il s'insère cohérent (style + BPM) et le mix suit tout seul</div>
          </div>
          <span style={{fontSize:10,background:"rgba(255,255,255,0.12)",padding:"6px 8px",borderRadius:999,border:"1px solid rgba(255,255,255,0.15)"}}>{autoDJ?"Auto-DJ ON":"Auto-DJ OFF"}</span>
        </div>
        <div style={{margin:"0 16px 12px", display:"flex",gap:8}}>
          <input id="liveTitle" placeholder="Ex. September — Earth Wind & Fire" style={{flex:1,border:"1px solid #ddd",padding:"11px 12px",borderRadius:999,fontSize:13,background:"#fff"}}/>
          <button onClick={addLive} style={{background:"#111",color:"#fff",padding:"11px 16px",borderRadius:999,fontSize:13,fontWeight:700}}>Ajouter live</button>
        </div>
        {liveTracks.length>0 && (
          <div style={{margin:"0 16px 12px", background:"#fff", border:"1px solid #eee", borderRadius:14, padding:10}}>
            <div style={{fontSize:11,fontWeight:800,letterSpacing:"0.08em",color:"#999"}}>AJOUTS LIVE · AUTO-PLACÉS</div>
            {liveTracks.map((t,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f5f5f5",fontSize:12}}><span><b>{t.title}</b> · {t.artist}</span><span style={{background:"#f5f5f7",padding:"3px 7px",borderRadius:999,fontSize:10}}>{t.bpm} BPM · {t.time}</span></div>)}
          </div>
        )}

        {/* TIMELINE — simple liste qui claque, ronds XL, titres majuscules */}
        <div id="timeline" style={{padding:"12px 16px 120px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <h2 style={{fontSize:12,letterSpacing:"0.14em",fontWeight:900,color:"#999"}}>TIMELINE JOUR J</h2>
            <button onClick={fillGaps} style={{fontSize:11,fontWeight:700,background:"#111",color:"#fff",padding:"7px 12px",borderRadius:999,border:"none"}}>✦ Combler les creux sans doublon</button>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:11,background:"#fff",padding:"6px 10px",borderRadius:999,border:"1px solid #eee"}}>
              <input type="checkbox" checked={autoDJ} onChange={e=>setAutoDJ(e.target.checked)} /> Synchro auto
            </label>
          </div>
          {fillMsg && <div style={{marginTop:8,background:"#111",color:"#fff",padding:"8px 12px",borderRadius:10,fontSize:11,textAlign:"center"}}>{fillMsg}</div>}

          {moments.map(m=>(
            <section key={m.title} style={{marginTop:18, background:"#fff", border:"1px solid #eee", borderRadius:18, overflow:"hidden"}}>
              <div style={{padding:"12px 14px", borderBottom:"1px solid #f2f2f2", background:"#fcfcf9"}}>
                <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:13,fontWeight:800}}>{m.time} — {m.end}</span>
                  <span style={{fontSize:14,fontWeight:900,letterSpacing:"0.06em"}}>{m.title}</span>
                  <span style={{fontSize:10,color:"#666",background:"#fff",padding:"4px 8px",borderRadius:999,border:"1px solid #eee",marginLeft:"auto"}}>{m.list.length} TITRES · {m.list.reduce((a,b)=>a+b.bpm,0)/m.list.length|0} BPM MOY</span>
                </div>
                {/* PRESTATAIRES — cartes recto/verso avec ronds médias */}
                <div style={{marginTop:10, display:"flex",gap:8,overflowX:"auto",paddingBottom:4, scrollbarWidth:"none"}}>
                  {m.prestas.map(p=>{
                    const pid = m.title+"-"+p.role;
                    const isFlippedP = flippedPresta===pid;
                    return (
                    <div key={p.role} style={{minWidth:148, perspective:"800px"}}>
                      <div onClick={()=>setFlippedPresta(isFlippedP?null:pid)} style={{position:"relative",width:148,height:96,transform: isFlippedP?"rotateY(180deg)":"rotateY(0deg)",transformStyle:"preserve-3d",transition:"transform 0.5s",cursor:"pointer"}}>
                        {/* RECTO */}
                        <div style={{position:"absolute",inset:0,background:"#fff",border:"1px solid #eee",borderRadius:14,padding:8,backfaceVisibility:"hidden",display:"flex",gap:8,alignItems:"center"}}>
                          <img src={`https://i.pravatar.cc/100?img=${p.role.length*7 % 70}`} style={{width:44,height:44,borderRadius:999,objectFit:"cover",border:"2px solid #fff",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}} alt="" />
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:11,fontWeight:800,lineHeight:1.1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
                            <div style={{fontSize:10,color:"#666"}}>{p.role} · {p.horaire.split("-")[0]}</div>
                            <div style={{fontSize:10,fontWeight:700,marginTop:2}}>380€ <span style={{fontWeight:400,color:"#999"}}>★4.9</span></div>
                          </div>
                          <span style={{position:"absolute",top:6,right:6,width:16,height:16,borderRadius:999,background:"#fff",border:"1px solid #eee",display:"grid",placeItems:"center",fontSize:8}}>↗</span>
                        </div>
                        {/* VERSO */}
                        <div style={{position:"absolute",inset:0,background:"#fff",border:"1px solid #eee",borderRadius:14,padding:8,backfaceVisibility:"hidden",transform:"rotateY(180deg)",display:"flex",flexDirection:"column",gap:6}}>
                          <div style={{display:"flex",gap:6,overflowX:"auto"}}>
                            {[1,2,3,4].map(i=>(
                              <div key={i} style={{width:36,height:36,borderRadius:999,overflow:"hidden",flexShrink:0,border:"2px solid #fff",boxShadow:"0 2px 6px rgba(0,0,0,0.08)",position:"relative"}}>
                                <img src={`https://picsum.photos/seed/${p.role+i}/60/60`} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                                {i===2 && <span style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"grid",placeItems:"center",color:"#fff",fontSize:8}}>▶</span>}
                              </div>
                            ))}
                            <span style={{fontSize:9,background:"#f5f5f7",padding:"6px 7px",borderRadius:999,alignSelf:"center",whiteSpace:"nowrap"}}>+12 photos</span>
                          </div>
                          <div style={{fontSize:10,background:"#fcfcf9",padding:"4px 6px",borderRadius:8,border:"1px solid #eee",textAlign:"center"}}>★4.9 (47 avis) · Vérifié · Assurance</div>
                          <div style={{display:"flex",gap:6,marginTop:"auto",alignItems:"center"}}>
                            <button style={{width:40,height:40,borderRadius:999,background:"#111",color:"#fff",border:"none",display:"grid",placeItems:"center"}}><CreditCard size={16} strokeWidth={1.6} /></button>
                            <button style={{width:40,height:40,borderRadius:999,background:"#fff",border:"1px solid #ddd",display:"grid",placeItems:"center"}}><MessageCircle size={16} strokeWidth={1.6} /></button>
                            <button style={{width:40,height:40,borderRadius:999,background:"#f5f5f7",border:"1px solid #eee",display:"grid",placeItems:"center"}}><RefreshCw size={14} strokeWidth={1.6} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
                <div style={{marginTop:8, background:"#fff", border:"1px solid #eee", borderRadius:10, padding:"8px 10px", display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:10,background:"#111",color:"#fff",padding:"3px 6px",borderRadius:999,fontWeight:800}}>INTELLIGENCE</span>
                  <span style={{fontSize:11,lineHeight:1.3}}>{m.title==="ACCUEIL"?"Volume doux — laissez les arrivées s'installer, photos en lumière naturelle": m.title==="COCKTAIL"?"Saxo 15h-17h : baissez le volume, laissez parler — bar spritz en service": m.title==="DÎNER"?"Service à l'assiette : tempo 82 BPM, on reste en fond, on monte à 22h": "Piste centrale : lumière basse, premier pas, tout le monde autour"}</span>
                </div>
              </div>
              <div style={{padding:"10px 12px"}}>
              <div style={{marginTop:10, display:"flex",flexDirection:"column",gap:12}}>
                {m.list.map(tr=>{
                  const active = playing===tr.t;
                  const isFlipped = flipped===tr.t;
                  return (
                  <div key={tr.t} style={{perspective:"1000px"}}>
                    <div style={{position:"relative", width:"100%", height: isFlipped? 235 : 112, transform: isFlipped?"rotateY(180deg)":"rotateY(0deg)", transformStyle:"preserve-3d", transition:"transform 0.55s cubic-bezier(0.4,0,0.2,1)"}}>
                      {/* FACE AVANT */}
                      <div style={{position:"absolute", inset:0, background:"#fff",borderRadius:20,padding:12,border:"1px solid #eee",display:"flex",gap:12,alignItems:"center",backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", boxSizing:"border-box"}}>
                        <div style={{position:"relative",width:88,height:88,borderRadius:999,overflow:"hidden",flexShrink:0,background:"#f5f5f7",border:"2px solid #fff",boxShadow:"0 8px 18px rgba(0,0,0,0.08)"}}>
                          <img src={`https://picsum.photos/seed/${encodeURIComponent(tr.t)}/120/120`} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                          <button onClick={(e)=>{e.stopPropagation(); setPlaying(active?null:tr.t)}} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.12)",display:"grid",placeItems:"center",border:"none",cursor:"pointer"}}>
                            <div style={{width:38,height:38,borderRadius:999,background:"#fff",display:"grid",placeItems:"center",fontSize:12,boxShadow:"0 4px 12px rgba(0,0,0,0.15)",border:"1px solid #eee"}}>{active?"❚❚":"▶"}</div>
                          </button>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:800,lineHeight:1.1}}>{tr.t}</div>
                          <div style={{fontSize:11,color:"#666",marginTop:2}}>{tr.a} · {tr.bpm} BPM · {tr.style}</div>
                          <div style={{display:"flex",gap:6,marginTop:6}}><span style={{fontSize:10,fontWeight:700,background:"#f5f5f7",padding:"4px 8px",borderRadius:999,border:"1px solid #eee"}}>{m.title}</span><span style={{fontSize:10,background:"#f5f5f7",padding:"4px 8px",borderRadius:999}}>{tr.style}</span></div>
                        </div>
                        <button onClick={(e)=>{e.stopPropagation(); setFlipped(tr.t)}} style={{position:"absolute",top:8,right:8,width:28,height:28,borderRadius:999,background:"#fff",color:"#111",border:"1px solid #eee",display:"grid",placeItems:"center",fontSize:12,boxShadow:"0 2px 8px rgba(0,0,0,0.08)",cursor:"pointer",zIndex:2}}>↗</button>
                      </div>
                      {/* FACE ARRIÈRE — verso orchestration */}
                      <div style={{position:"absolute", inset:0, background:"#fff",borderRadius:20,padding:12,border:"1px solid #eee",backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",transform:"rotateY(180deg)",boxShadow:"0 8px 24px rgba(0,0,0,0.08)",display:"flex",flexDirection:"column",gap:8,overflow:"hidden",boxSizing:"border-box"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{fontSize:10,letterSpacing:"0.1em",fontWeight:800,color:"#999"}}>VERSO · ORCHESTRATION</span>
                          <button onClick={(e)=>{e.stopPropagation(); setFlipped(null)}} style={{width:28,height:28,borderRadius:999,background:"#111",color:"#fff",border:"none",display:"grid",placeItems:"center",fontSize:12,cursor:"pointer"}}>✕</button>
                        </div>
                        <div style={{fontSize:12,fontWeight:700,lineHeight:1.1}}>{tr.t} <span style={{fontWeight:400,color:"#666",fontSize:11}}>— {tr.a}</span></div>
                        <div style={{background:"#fcfcf9",border:"1px solid #eee",borderRadius:12,padding:8,display:"flex",gap:8,alignItems:"center"}}>
                          <div style={{display:"flex"}}><img src="https://i.pravatar.cc/100?img=11" style={{width:28,height:28,borderRadius:999,border:"2px solid #fff"}} alt=""/><img src="https://i.pravatar.cc/100?img=32" style={{width:28,height:28,borderRadius:999,border:"2px solid #fff",marginLeft:-8}} alt=""/><img src="https://i.pravatar.cc/100?img=15" style={{width:28,height:28,borderRadius:999,border:"2px solid #fff",marginLeft:-8}} alt=""/></div>
                          <div style={{fontSize:10,lineHeight:1.3}}><b>Équipe sur ce créneau</b><br/><span style={{color:"#666"}}>Traiteur · Fleuriste · Photographe</span></div>
                          <span style={{marginLeft:"auto",fontSize:9,background:"#111",color:"#fff",padding:"4px 7px",borderRadius:999,fontWeight:700}}>3 prestas</span>
                        </div>
                        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                          <span style={{fontSize:10,fontWeight:700,background:"#f5f5f7",padding:"5px 8px",borderRadius:999,border:"1px solid #eee"}}>Plat +15min</span>
                          <span style={{fontSize:12,color:"#999"}}>›</span>
                          <span style={{fontSize:10,fontWeight:700,background:"#f5f5f7",padding:"5px 8px",borderRadius:999,border:"1px solid #eee"}}>Cocktail +15</span>
                          <span style={{fontSize:12,color:"#999"}}>›</span>
                          <span style={{fontSize:10,fontWeight:700,background:"#f5f5f7",padding:"5px 8px",borderRadius:999,border:"1px solid #eee"}}>Soirée +15</span>
                        </div>
                        <div style={{display:"flex",gap:6,marginTop:"auto",alignItems:"center"}}>
                          <button style={{width:40,height:40,borderRadius:999,background:"#111",color:"#fff",border:"none",display:"grid",placeItems:"center"}}><CreditCard size={16} strokeWidth={1.6} /></button>
                          <button style={{width:40,height:40,borderRadius:999,background:"#fff",border:"1px solid #ddd",display:"grid",placeItems:"center"}}><MessageCircle size={16} strokeWidth={1.6} /></button>
                          <button style={{width:40,height:40,borderRadius:999,background:"#f5f5f7",border:"1px solid #eee",display:"grid",placeItems:"center"}}><RefreshCw size={14} strokeWidth={1.6} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
              {playing && m.list.some(t=>t.t===playing) && (
                <div style={{marginTop:8,background:"#fff",border:"1px solid #eee",borderRadius:14,padding:12}}>
                  <div style={{fontSize:10,letterSpacing:"0.1em",fontWeight:800,color:"#999"}}>SCÉNARIO</div>
                  <div style={{fontSize:12,marginTop:4,lineHeight:1.4}}>Se joue à {m.time} — synchro {autoDJ?"auto":"manuelle"} BPM, crossfade 6s. Comme si un DJ était là.</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
                    <div style={{background:"#fcfcf9",border:"1px solid #eee",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#999",fontWeight:700}}>PRESTATAIRE</div><div style={{fontSize:11,fontWeight:700}}>DJ auto</div></div>
                    <div style={{background:"#fcfcf9",border:"1px solid #eee",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#999",fontWeight:700}}>BUDGET</div><div style={{fontSize:11,fontWeight:800}}>+0€</div></div>
                  </div>
                </div>
              )}
              {/* MÉDIAS INVITÉS — timeline <10s, cercles horizontaux */}
              <div style={{marginTop:10, background:"#fcfcf9", border:"1px solid #eee", borderRadius:12, padding:"8px 10px", display:"flex", gap:8, alignItems:"center", overflowX:"auto"}}>
                <span style={{fontSize:9,letterSpacing:"0.08em",fontWeight:800,color:"#999",whiteSpace:"nowrap"}}>MÉDIAS</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {(momentMedia[m.title]||[]).map(item=>(
                    <div key={item.id} style={{width:44,height:44,borderRadius:999,overflow:"hidden",flexShrink:0,border:"2px solid #fff",boxShadow:"0 2px 8px rgba(0,0,0,0.08)",position:"relative",background:"#f5f5f7"}}>
                      {item.type==="video" ? <video src={item.url} style={{width:"100%",height:"100%",objectFit:"cover"}} muted playsInline /> : <img src={item.url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />}
                      {item.type==="video" && <span style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.18)",display:"grid",placeItems:"center",color:"#fff",fontSize:8}}>▶</span>}
                      <span style={{position:"absolute",bottom:-2,right:-2,background:"#111",color:"#fff",fontSize:7,padding:"1px 3px",borderRadius:999,border:"1px solid #fff"}}>10s</span>
                    </div>
                  ))}
                  <input type="file" id={`file-${m.title.replace(/\s/g,"-")}`} accept="image/*,video/*" style={{display:"none"}} onChange={(e)=>handleMediaSelect(e, m.title)} />
                  <button onClick={()=>document.getElementById(`file-${m.title.replace(/\s/g,"-")}`)?.click()} style={{minWidth:44,height:44,borderRadius:999,border:"1.5px dashed #ddd",background:"#fff",display:"grid",placeItems:"center",fontSize:18,color:"#111",flexShrink:0}}>+</button>
                </div>
                <span style={{fontSize:10,color:"#999",whiteSpace:"nowrap"}}>→ Film auto · recadrage or</span>
              </div>
              </div>
            </section>
          ))}
          {liveTracks.length>0 && (
            <section style={{marginTop:16, background:"#fff",border:"1px dashed #ddd",borderRadius:16,padding:12}}>
              <div style={{fontSize:11,fontWeight:800,letterSpacing:"0.08em"}}>LIVE — AJOUTS AUTO-PLACÉS</div>
              {liveTracks.map(t=><div key={t.title} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f5f5f5",fontSize:12}}><span><b>{t.title}</b> · {t.artist}</span><span style={{fontSize:10,background:"#f5f5f7",padding:"4px 7px",borderRadius:999}}>{t.bpm} BPM</span></div>)}
            </section>
          )}
        </div>

        {/* CONTROLLER UNIFIÉ — auto-DJ */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(0,0,0,0.08)",padding:"10px 12px calc(10px + env(safe-area-inset-bottom))"}}>
          <div style={{height:3,background:"#eee",borderRadius:999,overflow:"hidden"}}><div style={{width:"36%",height:"100%",background:"#111",borderRadius:999}} /></div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
            <div style={{width:44,height:44,borderRadius:12,background:"#111",display:"grid",placeItems:"center",color:"#fff"}}>♫</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{playing || "Perfect — Ed Sheeran"}</div>
              <div style={{fontSize:11,color:"#666"}}>{autoDJ?"Auto-DJ synchro BPM · 6s crossfade":"Manuel"}</div>
            </div>
            <button onClick={()=>setPlaying(playing?"": "Perfect")} style={{width:44,height:44,borderRadius:999,background:"#111",color:"#fff",border:"none",display:"grid",placeItems:"center"}}>{playing?"❚❚":"▶"}</button>
          </div>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <span style={{flex:1,background:"#111",color:"#fff",padding:"10px",borderRadius:999,textAlign:"center",fontSize:12,fontWeight:700}}>▶ Jouer la journée</span>
            <span style={{background:"#fff",border:"1px solid #eee",padding:"10px 12px",borderRadius:999,fontSize:12}}>✎ Éditer</span>
            <span style={{background:"#007AFF",color:"#fff",padding:"10px 14px",borderRadius:999,fontSize:12,fontWeight:700}}>Débloquer 49€</span>
          </div>
        </div>
      </div>
    </div>
  );
}
