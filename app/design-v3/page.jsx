"use client";
import { useState } from "react";
import { MeshGradient } from '@paper-design/shaders-react';

const MOMENTS = [
  { name: "ACCUEIL", time: "09:30", end: "11:30", count: "2 TITRES · 7 MIN", color: "#FF6295" },
  { name: "CÉRÉMONIE", time: "12:00", end: "13:00", count: "0 TITRE · À COMPLÉTER", color: "#00A6CA" },
  { name: "COCKTAIL", time: "14:00", end: "18:00", count: "2 TITRES · 6 MIN", color: "#00AAE1" },
  { name: "DÎNER", time: "19:00", end: "21:30", count: "1 TITRE · 3 MIN", color: "#6200F7" },
  { name: "OUVERTURE DE BAL", time: "21:30", end: "22:00", count: "1 TITRE · INCONTOURNABLE", color: "#FF6295" },
  { name: "SOIRÉE", time: "22:00", end: "00:00", count: "6 TITRES · 28 MIN", color: "#00A6CA" },
];

const TRACKS = [
  { title: "Un peu de rêve", artist: "Vitaa", moment: "ACCUEIL", budget: "+0€", prestataire: "—", famille: "Témoins", scenario: "Arrivée des invités — laissez le temps de s'installer, volume doux." },
  { title: "Here Comes the Sun", artist: "The Beatles", moment: "ACCUEIL", budget: "+0€", prestataire: "Fleuriste", famille: "Parents", scenario: "Accueil — lumière du matin, on ouvre la journée en douceur." },
  { title: "La vie en rose", artist: "Édith Piaf", moment: "COCKTAIL", budget: "+120€ musiciens", prestataire: "Traiteur + Saxo", famille: "Grands-parents", scenario: "Cocktail — French touch, laissez parler les conversations." },
  { title: "Perfect", artist: "Ed Sheeran", moment: "OUVERTURE DE BAL", budget: "+0€", prestataire: "DJ — piste centrale", famille: "Mariés", scenario: "Ouverture — premier pas, lumière baissée, tout le monde autour." },
];

export default function DesignV3() {
  const [mode, setMode] = useState("circulaire"); // lineaire | circulaire
  const [playing, setPlaying] = useState(null);
  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(true);

  const activeTrack = TRACKS.find(t=>t.title===playing);

  return (
    <div style={{fontFamily:"Inter,system-ui", background:"#fcfcf9", color:"#111", minHeight:"100vh"}}>
      {/* HEADER */}
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 24px",background:"#fff",borderBottom:"1px solid #eee",position:"sticky",top:0,zIndex:20}}>
        <div style={{fontWeight:800,letterSpacing:"-0.04em",fontSize:16}}>HERA <span style={{fontFamily:"serif",fontWeight:300,fontStyle:"italic"}}>by Aime®</span> <span style={{fontSize:9,verticalAlign:"super",background:"#111",color:"#fff",padding:"2px 5px",borderRadius:999,marginLeft:6}}>WORLD RANKING</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:11,background:"#f5f5f5",padding:"6px 10px",borderRadius:999}}>Classement universel · 78 titres déployés</span>
          <span style={{background:"#111",color:"#fff",padding:"10px 18px",borderRadius:999,fontSize:13,fontWeight:600}}>＋ Ajouter un morceau</span>
        </div>
      </header>

      {/* HERO avec onboarding */}
      <div style={{position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,zIndex:0}}>
          <MeshGradient speed={0.41} scale={1} distortion={0.8} swirl={0.1} colors={['#FF6295', '#00A6CA', '#00AAE1', '#6200F7']} style={{height:"100%",width:"100%"}} />
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.2)"}} />
        </div>
        <div style={{position:"relative",zIndex:1, maxWidth:1180, margin:"0 auto", padding:"28px 24px 36px", display:"grid", gridTemplateColumns:"1.1fr 440px", gap:28, alignItems:"center"}}>
          <div style={{color:"#fff"}}>
            <p style={{fontSize:10,letterSpacing:"0.22em",opacity:0.95,background:"rgba(255,255,255,0.14)",display:"inline-block",padding:"7px 12px",borderRadius:999,backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.18)"}}>HERA · GÉNÉRATION & DÉPLOIEMENT UNIVERSEL</p>
            <h1 style={{fontSize:52,fontWeight:900,lineHeight:0.9,margin:"16px 0",letterSpacing:"-0.05em",textTransform:"uppercase"}}>Le cadran<br/><span style={{fontFamily:"serif",fontStyle:"italic",fontWeight:300,textTransform:"none"}}>musical</span> de votre jour</h1>
            <p style={{opacity:0.95, fontSize:14, lineHeight:1.5, maxWidth:460}}>Un ordre universel reconnu. Chaque titre est déployé à son heure exacte sur le cadran. Structure lisible en un coup d'œil.</p>
            <div style={{display:"flex",gap:8,marginTop:16}}>
              <span style={{background:"#fff",color:"#111",padding:"7px 12px",borderRadius:999,fontSize:11,fontWeight:700}}>◎ Mode circulaire</span>
              <span style={{background:"rgba(0,0,0,0.25)",color:"#fff",padding:"7px 12px",borderRadius:999,fontSize:11,border:"1px solid rgba(255,255,255,0.25)"}}>78 déployés · 5h00</span>
            </div>
          </div>

          <div style={{background:"#fff",borderRadius:22,padding:18,boxShadow:"0 24px 60px rgba(0,0,0,0.25)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <p style={{fontSize:10,letterSpacing:"0.16em",color:"#999",fontWeight:700}}>ONBOARDING · {step}/3</p>
              <div style={{display:"flex",gap:4}}>{[1,2,3].map(i=><div key={i} style={{width:22,height:4,borderRadius:999,background: i<=step?"#111":"#eee"}} />)}</div>
            </div>
            {step===1 && <div style={{display:"flex",flexDirection:"column",gap:8}}><h3 style={{fontSize:14,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.04em"}}>Mariage</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input defaultValue="Camille" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}}/><input defaultValue="Alex" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}}/></div><input defaultValue="12 juillet 2027 · Château de Saulx" style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:13}}/><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><span style={{fontSize:11,background:"#111",color:"#fff",padding:"6px 10px",borderRadius:999}}>09:30 ACCUEIL</span><span style={{fontSize:11,background:"#f5f5f5",padding:"6px 10px",borderRadius:999}}>14:00 COCKTAIL</span><span style={{fontSize:11,background:"#f5f5f5",padding:"6px 10px",borderRadius:999}}>21:30 BAL</span></div></div>}
            {step===2 && <div style={{display:"flex",flexDirection:"column",gap:8}}><h3 style={{fontSize:14,fontWeight:800,textTransform:"uppercase"}}>Goûts & Thème</h3><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["Soul","Disco","Français","Élégant","Festif"].map(t=><span key={t} style={{fontSize:11,padding:"6px 10px",borderRadius:999,background:"#111",color:"#fff"}}>{t}</span>)}<span style={{fontSize:11,padding:"6px 10px",borderRadius:999,background:"#fff",border:"1px solid #ddd"}}>+ Ajouter</span></div><textarea defaultValue="Soul chaleureuse, on veut danser dès le dessert." style={{border:"1px solid #eee",padding:"10px 12px",borderRadius:12,fontSize:12,minHeight:60}} /></div>}
            {step===3 && <div><h3 style={{fontSize:14,fontWeight:800,textTransform:"uppercase"}}>Invités & Budget</h3><p style={{fontSize:12,color:"#666"}}>Chaque proposition écrit le budget tout seul pendant la lecture.</p><div style={{background:"#f7f7f5",padding:10,borderRadius:12,marginTop:8,fontSize:11}}>120 invités · 12 prestataires · budget en auto-écriture</div></div>}
            <div style={{display:"flex",gap:8,marginTop:14}}>
              {step>1 && <button onClick={()=>setStep(s=>s-1)} style={{flex:1,border:"1px solid #ddd",background:"#fff",padding:"11px",borderRadius:999,fontSize:13}}>Retour</button>}
              {step<3 ? <button onClick={()=>setStep(s=>s+1)} style={{flex:2,background:"#111",color:"#fff",padding:"11px",borderRadius:999,fontSize:13,fontWeight:700}}>Continuer →</button>
              : <button onClick={()=>setGenerated(true)} style={{flex:2,background:"linear-gradient(90deg,#FF6295,#6200F7)",color:"#fff",padding:"11px",borderRadius:999,fontSize:13,fontWeight:800}}>✦ Générer le cadran →</button>}
            </div>
          </div>
        </div>
      </div>

      {/* SWITCH LINEAIRE / CIRCULAIRE */}
      <div style={{maxWidth:1100,margin:"18px auto",padding:"0 24px",display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:11,letterSpacing:"0.1em",color:"#999",fontWeight:700}}>VUE</span>
        <button onClick={()=>setMode("lineaire")} style={{padding:"7px 12px",borderRadius:999,fontSize:12,fontWeight:600,background: mode==="lineaire"?"#111":"#fff",color: mode==="lineaire"?"#fff":"#111",border:"1px solid #ddd"}}>≡ Linéaire</button>
        <button onClick={()=>setMode("circulaire")} style={{padding:"7px 12px",borderRadius:999,fontSize:12,fontWeight:700,background: mode==="circulaire"?"#111":"#fff",color: mode==="circulaire"?"#fff":"#111",border:"1px solid #ddd"}}>◎ Cadran (horloge)</button>
        <span style={{marginLeft:"auto",fontSize:11,background:"#fff",border:"1px solid #eee",padding:"6px 10px",borderRadius:999}}>Classement universel · déploiement 09:30 → 00:00</span>
      </div>

      {/* CADRAN CIRCULAIRE */}
      {mode==="circulaire" ? (
        <div style={{maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"420px 1fr", gap:24, alignItems:"start"}}>
          <div style={{background:"#fff",border:"1px solid #eee",borderRadius:24,padding:18,position:"sticky",top:70}}>
            <p style={{fontSize:11,letterSpacing:"0.14em",color:"#999",fontWeight:700}}>CADRAN MUSICAL · STRUCTURE EN UN COUP D'ŒIL</p>
            <div style={{position:"relative", width:360,height:360, margin:"16px auto"}}>
              <svg width="360" height="360" viewBox="0 0 360 360" style={{display:"block"}}>
                <circle cx="180" cy="180" r="148" fill="none" stroke="#f0f0f0" strokeWidth="1" />
                <circle cx="180" cy="180" r="118" fill="none" stroke="#f5f5f5" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="180" cy="180" r="88" fill="none" stroke="#fafafa" strokeWidth="1" />
                {/* Heures */}
                {[0,3,6,9].map(h=>{
                  const ang=(h/12)*360-90; const rad=ang*Math.PI/180;
                  const x=180+Math.cos(rad)*158; const y=180+Math.sin(rad)*158;
                  return <text key={h} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#999" fontWeight="600">{String(h).padStart(2,"0")}:00</text>
                })}
                {/* Moments */}
                {MOMENTS.map((m,i)=>{
                  const [hh,mm]=m.time.split(":").map(Number);
                  const mins=hh*60+mm; const ang=(mins/1440)*360-90; const rad=ang*Math.PI/180;
                  const r=148; const x=180+Math.cos(rad)*r; const y=180+Math.sin(rad)*r;
                  return <g key={m.name}>
                    <circle cx={x} cy={y} r="26" fill="#111" stroke="#fff" strokeWidth="3" />
                    <text x={x} y={y-4} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="800">{m.name.split(" ")[0]}</text>
                    <text x={x} y={y+7} textAnchor="middle" fontSize="7" fill="#fff" opacity="0.8">{m.time}</text>
                  </g>
                })}
                {/* Aiguille jour */}
                <line x1="180" y1="180" x2="180" y2="42" stroke="#FF6295" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                <circle cx="180" cy="180" r="8" fill="#111" stroke="#fff" strokeWidth="2" />
                <text x="180" y="205" textAnchor="middle" fontSize="9" fontWeight="700" fill="#111">MAINTENANT</text>
              </svg>
              <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",background:"#fff",border:"1px solid #eee",borderRadius:16,padding:"10px 14px",textAlign:"center",boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}}>
                <div style={{fontSize:10,letterSpacing:"0.12em",color:"#999",fontWeight:700}}>DÉPLOIEMENT</div>
                <div style={{fontSize:18,fontWeight:900}}>78 TITRES</div>
                <div style={{fontSize:11,color:"#666"}}>09:30 → 00:00 · 5h00</div>
              </div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {MOMENTS.map(m=><span key={m.name} style={{fontSize:10,padding:"5px 8px",borderRadius:999,background:m.color,color:"#fff",fontWeight:700}}>{m.name} {m.time}</span>)}
            </div>
          </div>

          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <h2 style={{fontSize:18,fontWeight:900,letterSpacing:"-0.02em",textTransform:"uppercase"}}>Déploiement jour J</h2>
              <span style={{fontSize:11,background:"#fff",border:"1px solid #eee",padding:"6px 10px",borderRadius:999}}>Ordre universel</span>
            </div>
            {/* Tracks en grille avec ronds XL */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {TRACKS.map(t=>{
                const isActive = playing===t.title;
                return (
                <div key={t.title} onClick={()=>setPlaying(t.title)} style={{background:"#fff",border: isActive?"1px solid #ddd":"1px solid #eee",borderRadius:20,padding:14,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow: isActive?"0 8px 24px rgba(0,0,0,0.08)":"none"}}>
                  {isActive && <div style={{position:"absolute",inset:0,opacity:0.06}}><MeshGradient speed={0.3} colors={['#FF6295','#00A6CA','#6200F7','#00AAE1']} style={{height:"100%",width:"100%"}} /></div>}
                  <div style={{position:"relative",display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{position:"relative",width:84,height:84,borderRadius:999,overflow:"hidden",flexShrink:0,background:"#f5f5f5",boxShadow:"0 6px 18px rgba(0,0,0,0.08)",border:"2px solid #fff"}}>
                      <img src={`https://picsum.photos/seed/${encodeURIComponent(t.title)}/120/120`} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                      <div style={{position:"absolute",inset:0,background: isActive?"rgba(0,0,0,0.12)":"rgba(0,0,0,0.14)",display:"grid",placeItems:"center"}}>
                        <span style={{width:36,height:36,borderRadius:999,background:"#fff",color:"#111",display:"grid",placeItems:"center",fontSize:12,boxShadow:"0 4px 12px rgba(0,0,0,0.15)",border:"1px solid #eee"}}>{isActive?"❚❚":"▶"}</span>
                      </div>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:800,lineHeight:1.1}}>{t.title}</div>
                      <div style={{fontSize:11,color:"#666"}}>{t.artist} · {t.moment}</div>
                      <div style={{display:"flex",gap:6,marginTop:6}}><span style={{fontSize:10,background:"#f5f5f5",color:"#111",padding:"4px 7px",borderRadius:999,fontWeight:600,border:"1px solid #eee"}}>{t.moment}</span><span style={{fontSize:10,background:"#f5f5f5",padding:"4px 7px",borderRadius:999,border:"1px solid #f5f5f5"}}>Élégant</span></div>
                    </div>
                  </div>
                  {isActive && (
                    <div style={{position:"relative",marginTop:12,background:"#fff",border:"1px solid #eee",borderRadius:14,padding:12}}>
                      <p style={{fontSize:11,fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase"}}>Scénario & Conseils</p>
                      <p style={{fontSize:12,marginTop:4,lineHeight:1.4, color:"#333"}}>{t.scenario}</p>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10}}>
                        <div style={{background:"#fcfcf9",border:"1px solid #eee",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#999",letterSpacing:"0.08em",fontWeight:700}}>PRESTATAIRE</div><div style={{fontSize:11,fontWeight:700,marginTop:2}}>{t.prestataire}</div></div>
                        <div style={{background:"#fcfcf9",border:"1px solid #eee",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#999",fontWeight:700}}>FAMILLE</div><div style={{fontSize:11,fontWeight:700,marginTop:2}}>{t.famille}</div></div>
                        <div style={{background:"#fcfcf9",border:"1px solid #eee",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#999",letterSpacing:"0.08em",fontWeight:700}}>BUDGET AUTO</div><div style={{fontSize:11,fontWeight:800,marginTop:2}}>{t.budget}</div></div>
                      </div>
                      <p style={{fontSize:10,color:"#999",marginTop:8}}>S'écrit tout seul pendant la lecture — structure super lisible.</p>
                    </div>
                  )}
                </div>
                )
              })}
            </div>
            <p style={{fontSize:11,color:"#999",marginTop:10,textAlign:"center"}}>Clique un rond → le scénario + prestataire + budget s'écrivent tout seuls</p>
          </div>
        </div>
      ) : (
        <div style={{maxWidth:900, margin:"16px auto", padding:"0 24px"}}>
          <p style={{fontSize:11,color:"#999"}}>Mode linéaire — passe en ◎ Cadran pour la vue horloge</p>
        </div>
      )}

      {/* CONTROLLER UNIFIÉ — pictos modernes */}
      <div style={{position:"sticky",bottom:0,zIndex:20, background:"#111", color:"#fff"}}>
        <div style={{height:3, background:"#222"}}><div style={{height:"100%", width: "38%", background:"linear-gradient(90deg, #FF6295, #6200F7)"}} /></div>
        <div style={{maxWidth:1180,margin:"0 auto",padding:"12px 16px",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <button style={{background:"#fff",color:"#111",padding:"11px 18px",borderRadius:999,fontSize:13,fontWeight:800,display:"flex",alignItems:"center",gap:8}}>▶ Jouer la journée <span style={{fontSize:10,opacity:0.6,background:"#f5f5f5",padding:"3px 6px",borderRadius:999}}>Mix continu</span></button>
          <div style={{display:"flex",gap:6}}><span style={{width:36,height:36,borderRadius:999,border:"1px solid #333",display:"grid",placeItems:"center"}}>⏮</span><span style={{width:36,height:36,borderRadius:999,border:"1px solid #333",display:"grid",placeItems:"center"}}>⏭</span><span style={{width:32,height:32,borderRadius:999,border:"1px solid #333",display:"grid",placeItems:"center"}}>■</span></div>
          <div style={{flex:1,minWidth:180}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.7}}><span>09:30 ACCUEIL → 00:00 AFTERPARTY</span><span>2:34 / 5:00</span></div><div style={{height:4,background:"#222",borderRadius:999,marginTop:4}}><div style={{width:"38%",height:"100%",background:"#fff",borderRadius:999}} /></div></div>
          <div style={{display:"flex",gap:8,alignItems:"center",background:"#1a1a1a",padding:"6px 10px",borderRadius:999}}><span style={{fontSize:11,opacity:0.7}}>Transition</span><span style={{background:"#fff",color:"#111",padding:"4px 8px",borderRadius:999,fontSize:11,fontWeight:700}}>Crossfade 6s</span><span style={{fontSize:11,opacity:0.6}}>BPM 120 • Keep Pitch</span></div>
          <button style={{border:"1px solid #333",padding:"8px 12px",borderRadius:999,fontSize:12,fontWeight:600}}>✎ Éditer timeline</button>
        </div>
        <div style={{background:"#0f0f0f",borderTop:"1px solid #222",padding:"10px 16px",display:"flex",gap:10,alignItems:"center",maxWidth:1180,margin:"0 auto",flexWrap:"wrap"}}>
          <span style={{width:28,height:28,borderRadius:999,background:"rgba(255,255,255,0.08)",display:"grid",placeItems:"center",border:"1px solid #333",fontSize:12}}>✦</span>
          <span style={{fontSize:11,opacity:0.7}}>Accès premium</span>
          <span style={{background:"#fff",color:"#111",padding:"7px 14px",borderRadius:999,fontSize:12,fontWeight:800}}>Débloquer · 49€</span>
          <span style={{fontSize:11,opacity:0.6,flex:1}}>Mix continu + feuille de route + exports</span>
          <span style={{display:"flex",alignItems:"center",gap:6,background:"#fff",color:"#111",padding:"6px 10px",borderRadius:999,fontSize:11,fontWeight:700}}><span style={{width:18,height:18,borderRadius:999,background:"#111",color:"#fff",display:"grid",placeItems:"center",fontSize:9}}>♫</span> 66 titres · ~85€</span>
        </div>
      </div>

      <div style={{textAlign:"center",padding:16,color:"#999",fontSize:11,background:"#fcfcf9"}}>HERA V3 — Cadran universel · Ronds XL 84px · Titres en majuscule · Pictos modernes · Budget auto-écrit</div>
    </div>
  );
}
