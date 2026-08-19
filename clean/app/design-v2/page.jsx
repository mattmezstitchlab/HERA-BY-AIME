"use client";
import { useState } from "react";
import { MeshGradient } from '@paper-design/shaders-react';

export default function DesignV2() {
  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(null);

  return (
    <div style={{fontFamily:"Inter,system-ui", background:"#f7f7f5", color:"#111", minHeight:"100vh"}}>
      {/* HEADER */}
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 24px",background:"#fff",borderBottom:"1px solid #eee",position:"sticky",top:0,zIndex:20}}>
        <div style={{fontWeight:800,letterSpacing:"-0.03em",fontSize:15}}>HERA <span style={{fontFamily:"serif",fontWeight:300,fontStyle:"italic"}}>by Aime®</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{border:"1px solid #111",background: menuOpen?"#111":"#fff",color: menuOpen?"#fff":"#111",padding:"8px 14px",borderRadius:999,fontSize:13,fontWeight:500}}>☰ Filtres {menuOpen?"×":""}</button>
          <span style={{background:"#111",color:"#fff",padding:"10px 18px",borderRadius:999,fontSize:13,fontWeight:600}}>＋ Ajouter un morceau</span>
        </div>
      </header>

      {/* HERO avec MeshGradient + Onboarding intégré */}
      <div style={{position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,zIndex:0}}>
          <MeshGradient speed={0.41} scale={1} distortion={0.8} swirl={0.1} colors={['#FF6295', '#00A6CA', '#00AAE1', '#6200F7']} style={{height:"100%",width:"100%"}} />
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45))"}} />
        </div>

        <div style={{position:"relative",zIndex:1, maxWidth:1100, margin:"0 auto", padding:"32px 24px 40px", display:"grid", gridTemplateColumns:"1fr 420px", gap:32, alignItems:"center"}}>
          {/* Texte */}
          <div style={{color:"#fff"}}>
            <p style={{fontSize:11,letterSpacing:"0.2em",opacity:0.9,background:"rgba(255,255,255,0.15)",display:"inline-block",padding:"6px 10px",borderRadius:999,backdropFilter:"blur(10px)"}}>HERA · COMPOSITION MUSICALE DE MARIAGE</p>
            <h1 style={{fontSize:48,fontWeight:800,lineHeight:0.95,margin:"18px 0",letterSpacing:"-0.04em"}}>Votre playlist<br/>devient le<br/><span style={{fontFamily:"serif",fontStyle:"italic",fontWeight:300}}>déroulé</span> de votre mariage</h1>
            <p style={{opacity:0.9, fontSize:15, lineHeight:1.5, maxWidth:480}}>Chaque morceau porte son heure, son auteur et son souvenir. Générez la journée en 30 secondes.</p>
            <div style={{display:"flex",gap:12,marginTop:18,flexWrap:"wrap"}}>
              <span style={{background:"rgba(255,255,255,0.9)",color:"#111",padding:"8px 12px",borderRadius:999,fontSize:12,backdropFilter:"blur(10px)"}}>✓ 78 titres générés</span>
              <span style={{background:"rgba(255,255,255,0.15)",color:"#fff",padding:"8px 12px",borderRadius:999,fontSize:12,border:"1px solid rgba(255,255,255,0.2)"}}>✦ IA HERA</span>
            </div>
          </div>

          {/* ONBOARDING CARD — directement dans le hero */}
          <div style={{background:"#fff",borderRadius:20,padding:20,boxShadow:"0 24px 60px rgba(0,0,0,0.25)", border:"1px solid rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <p style={{fontSize:11,letterSpacing:"0.15em",color:"#999",fontWeight:600}}>ONBOARDING · ÉTAPE {step}/3</p>
              <div style={{display:"flex",gap:4}}>{[1,2,3].map(i=><div key={i} style={{width:20,height:4,borderRadius:999,background: i<=step?"#111":"#eee"}} />)}</div>
            </div>

            {step===1 && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <h3 style={{fontSize:16,fontWeight:700}}>Votre mariage</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <input placeholder="Prénom 1" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}} defaultValue="Camille" />
                  <input placeholder="Prénom 2" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}} defaultValue="Alex" />
                </div>
                <input placeholder="Date — 12 juillet 2027" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}} defaultValue="12 juillet 2027" />
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <input placeholder="Lieu" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}} defaultValue="Château de Saulx" />
                  <input placeholder="Invités" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}} defaultValue="120 invités" />
                </div>
                <div style={{display:"flex",gap:8,marginTop:6}}>
                  <span style={{fontSize:11,background:"#f5f5f5",padding:"6px 10px",borderRadius:999}}>09:30 Accueil</span>
                  <span style={{fontSize:11,background:"#f5f5f5",padding:"6px 10px",borderRadius:999}}>14:00 Cocktail</span>
                  <span style={{fontSize:11,background:"#f5f5f5",padding:"6px 10px",borderRadius:999}}>22:00 Soirée</span>
                </div>
              </div>
            )}

            {step===2 && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <h3 style={{fontSize:16,fontWeight:700}}>Vos goûts</h3>
                <p style={{fontSize:12,color:"#666"}}>Ce que vous aimez, ce que vous détestez — HERA génère le reste.</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {["Soul chaleureuse","Disco","Français","Élégant","Festif","Nostalgique","70s-90s","Pas de techno"].map(t=>(
                    <span key={t} style={{fontSize:11,padding:"6px 10px",borderRadius:999,background: ["Soul chaleureuse","Français","Festif"].includes(t)?"#111":"#f5f5f5",color:["Soul chaleureuse","Français","Festif"].includes(t)?"#fff":"#111",border:"1px solid #eee"}}>{t}</span>
                  ))}
                </div>
                <textarea placeholder="Ex. on veut danser dès le dessert, rien de trop connu..." style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:12,minHeight:70}} defaultValue="Soul et disco chaleureuses, quelques classiques français, on veut danser dès le dessert." />
              </div>
            )}

            {step===3 && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <h3 style={{fontSize:16,fontWeight:700}}>Vos invités</h3>
                <div style={{background:"#f7f7f5",padding:12,borderRadius:12,display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{width:32,height:32,borderRadius:999,background:"#111",color:"#fff",display:"grid",placeItems:"center",fontSize:12}}>♡</span>
                  <div><p style={{fontSize:12,fontWeight:600}}>Lien invités</p><p style={{fontSize:11,color:"#666"}}>Chacun propose un titre + son souvenir</p></div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <span style={{fontSize:11,background:"#fff",border:"1px solid #ddd",padding:"6px 10px",borderRadius:999}}>👵 Mamie — 2 titres</span>
                  <span style={{fontSize:11,background:"#fff",border:"1px solid #ddd",padding:"6px 10px",borderRadius:999}}>👨‍👩‍👧 Témoins — 4 titres</span>
                </div>
              </div>
            )}

            <div style={{display:"flex",gap:8,marginTop:16}}>
              {step>1 && <button onClick={()=>setStep(s=>s-1)} style={{flex:1,border:"1px solid #ddd",background:"#fff",padding:"12px",borderRadius:999,fontSize:13}}>Retour</button>}
              {step<3 ? <button onClick={()=>setStep(s=>s+1)} style={{flex:2,background:"#111",color:"#fff",padding:"12px",borderRadius:999,fontSize:13,fontWeight:600}}>Continuer →</button>
              : <button onClick={()=>setGenerated(true)} style={{flex:2,background:"#111",color:"#fff",padding:"12px",borderRadius:999,fontSize:13,fontWeight:700,boxShadow:"0 8px 20px rgba(0,0,0,0.2)"}}>✦ Générer la timeline →</button>}
            </div>
            <p style={{fontSize:10,color:"#999",textAlign:"center",marginTop:8}}>78 titres · 5h00 · 1 clic</p>
          </div>
        </div>
      </div>

      {/* MENU FILTRES — slide over */}
      {menuOpen && (
        <div style={{background:"#fff",borderBottom:"1px solid #eee",padding:"16px 24px",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:11,letterSpacing:"0.1em",color:"#999",fontWeight:600}}>FILTRES</span>
          {["Tous","À valider","Incontournables","Interdits","Sans moment","Sans souvenir","Avec souvenir"].map(t=>(
            <span key={t} style={{background: t==="Tous"?"#111":"#fff", color: t==="Tous"?"#fff":"#111", border:"1px solid #ddd", padding:"7px 12px", borderRadius:999, fontSize:12, cursor:"pointer"}}>{t}</span>
          ))}
          <span style={{marginLeft:"auto",fontSize:11,color:"#666",background:"#f5f5f5",padding:"6px 10px",borderRadius:999}}>78 morceaux · Tous les créneaux tenus</span>
          <button onClick={()=>setMenuOpen(false)} style={{marginLeft:8,background:"#111",color:"#fff",padding:"6px 12px",borderRadius:999,fontSize:12}}>Fermer ✕</button>
        </div>
      )}

      {/* TIMELINE — pochettes RONDES + Play dedans */}
      <div style={{maxWidth:900, margin:"24px auto", padding:"0 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{fontSize:22,fontWeight:800,letterSpacing:"-0.02em"}}>Timeline jour J {generated && <span style={{background:"#111",color:"#fff",fontSize:10,padding:"4px 8px",borderRadius:999,marginLeft:8}}>GÉNÉRÉE ✨</span>}</h2>
          <span style={{fontSize:11,color:"#666"}}>{generated?"78 morceaux · 5h00":"Prévisualisation"}</span>
        </div>

        <div style={{marginTop:16, borderLeft:"1px solid #eee", paddingLeft:16}}>
          {[
            {time:"09:30", title:"Accueil", count:"2 morceaux · 7 min", tracks:[
              {title:"Un peu de rêve", artist:"Vitaa feat. Claudio Capeo", badge:"NORMAL", color:"#ec4899"},
              {title:"Here Comes the Sun", artist:"The Beatles", badge:"NORMAL", color:"#f59e0b", quote:"Pour l'arrivée des invités."},
            ]},
            {time:"14:00", title:"Cocktail", count:"2 morceaux · 6 min", tracks:[
              {title:"La vie en rose", artist:"Édith Piaf", badge:"IMPORTANT", color:"#8b5cf6"},
              {title:"Fly Me to the Moon", artist:"Frank Sinatra", badge:"NORMAL", color:"#06b6d4"},
            ]},
            {time:"21:30", title:"Ouverture de bal", count:"1 morceau", tracks:[
              {title:"Perfect", artist:"Ed Sheeran", badge:"INCONTOURNABLE", color:"#4c1d95", quote:"Notre première danse."},
            ]},
          ].map(m=>(
            <section key={m.title} style={{paddingBottom:20}}>
              <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                <div style={{width:8,height:8,background:"#111",borderRadius:999, marginLeft:-20}}></div>
                <span style={{fontSize:13,color:"#666"}}>{m.time}</span>
                <span style={{fontSize:17,fontWeight:700}}>{m.title}</span>
                <span style={{fontSize:11,color:"#999"}}>{m.count}</span>
              </div>
              <div style={{marginTop:10, display:"flex",flexDirection:"column",gap:10}}>
                {m.tracks.map(t=>(
                  <div key={t.title} style={{background:"#fff",border:"1px solid #eee",borderRadius:16,padding:12,display:"flex",gap:14,alignItems:"center"}}>
                    {/* POCHETTE RONDE + PLAY DEDANS */}
                    <div style={{position:"relative",width:64,height:64,borderRadius:999,overflow:"hidden",flexShrink:0, background:"#f5f5f5", boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}}>
                      <img src={`https://picsum.photos/seed/${encodeURIComponent(t.title)}/100/100`} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                      <button onClick={()=>setPlaying(playing===t.title?null:t.title)} style={{position:"absolute",inset:0,background: playing===t.title?"rgba(0,0,0,0.35)":"rgba(0,0,0,0.2)",display:"grid",placeItems:"center",border:"none",cursor:"pointer",backdropFilter:"blur(2px)"}}>
                        <span style={{width:28,height:28,borderRadius:999,background:"#fff",display:"grid",placeItems:"center",fontSize:10,boxShadow:"0 2px 8px rgba(0,0,0,0.2)"}}>{playing===t.title?"❚❚":"▶"}</span>
                      </button>
                      <div style={{position:"absolute",bottom:4,right:4,width:12,height:12,borderRadius:999,background:t.color,border:"2px solid #fff"}} />
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"flex-start"}}>
                        <div style={{minWidth:0}}><div style={{fontSize:14,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.title}</div><div style={{fontSize:12,color:"#666"}}>{t.artist}</div></div>
                        <span style={{fontSize:10,background:t.badge==="INCONTOURNABLE"?"#111":"#f5f5f5",color:t.badge==="INCONTOURNABLE"?"#fff":"#666",padding:"5px 8px",borderRadius:999,fontWeight:600}}>{t.badge}</span>
                      </div>
                      <div style={{display:"flex",gap:6,marginTop:6}}>
                        <span style={{fontSize:11,background:"#f5f5f5",padding:"3px 7px",borderRadius:999}}>◷ {m.title}</span>
                        <span style={{fontSize:11,background:"#f5f5f5",padding:"3px 7px",borderRadius:999}}>Élégant</span>
                      </div>
                      {t.quote && <div style={{fontSize:11,color:"#888",fontStyle:"italic",marginTop:4}}>« {t.quote} »</div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* CONTROLLER UNIFIÉ MODERNE — timeline + mix + causalité */}
      <div style={{position:"sticky",bottom:0,zIndex:20, background:"#111", color:"#fff", borderTop:"1px solid #222"}}>
        <div style={{height:3, background:"#222"}}><div style={{height:"100%", width: generated?"42%":"0%", background:"linear-gradient(90deg, #FF6295, #6200F7)", transition:"width 0.6s"}} /></div>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"12px 16px",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setGenerated(!generated)} style={{background:"#fff",color:"#111",padding:"10px 16px",borderRadius:999,fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
            {generated?"❚❚ Pause":"▶ Jouer la journée"} <span style={{fontSize:10,opacity:0.6}}>{generated?"Mix continu":"Extrait"}</span>
          </button>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{width:32,height:32,borderRadius:999,border:"1px solid #333",display:"grid",placeItems:"center",fontSize:12}}>⏮</span>
            <span style={{width:32,height:32,borderRadius:999,border:"1px solid #333",display:"grid",placeItems:"center",fontSize:12}}>⏭</span>
            <span style={{width:28,height:28,borderRadius:999,border:"1px solid #333",display:"grid",placeItems:"center",fontSize:10}}>■</span>
          </div>
          <div style={{flex:1,minWidth:160}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.7}}><span>09:30 Accueil → 00:00 Afterparty</span><span>2:34 / 5:00</span></div>
            <div style={{height:4,background:"#222",borderRadius:999,marginTop:4,overflow:"hidden"}}><div style={{width:"38%",height:"100%",background:"#fff",borderRadius:999}} /></div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",background:"#1a1a1a",padding:"6px 10px",borderRadius:999}}>
            <span style={{fontSize:11,opacity:0.7}}>Crossfade</span>
            <span style={{background:"#fff",color:"#111",padding:"4px 8px",borderRadius:999,fontSize:11,fontWeight:600}}>6s</span>
            <span style={{fontSize:11,opacity:0.6}}>BPM 120 • Pitch ✓</span>
          </div>
          <div style={{display:"flex",gap:6}}>
            <span style={{border:"1px solid #333",padding:"7px 10px",borderRadius:999,fontSize:11}}>✎ Modifier</span>
            <span style={{background:"#FF6295",padding:"7px 12px",borderRadius:999,fontSize:11,fontWeight:700}}>↗ Lien causal</span>
          </div>
        </div>
        <div style={{background:"#0f0f0f",borderTop:"1px solid #222",padding:"8px 16px",display:"flex",gap:8,alignItems:"center",maxWidth:1100,margin:"0 auto"}}>
          <span style={{fontSize:11,opacity:0.6}}>🔒 Lecture verrouillée</span>
          <span style={{background:"#fff",color:"#111",padding:"6px 12px",borderRadius:999,fontSize:12,fontWeight:700}}>Valider la composition · 49€</span>
          <span style={{fontSize:11,opacity:0.6,flex:1}}>Débloque le mix, la feuille de route et le "Tout acheter en 1 clic"</span>
          <span style={{fontSize:11,background:"#6200F7",padding:"6px 10px",borderRadius:999}}>🛒 66 à acheter ~85€</span>
        </div>
      </div>

      <div style={{textAlign:"center",padding:16,color:"#999",fontSize:11,background:"#f7f7f5"}}>HERA V2 — Preview buzz : onboarding dans le hero · pochettes rondes · filtres en menu · controller unifié</div>
    </div>
  );
}
