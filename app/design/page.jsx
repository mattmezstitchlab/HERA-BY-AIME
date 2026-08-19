"use client";
import { MeshGradient } from '@paper-design/shaders-react';
export default function DesignPreview() {
  return (
    <div style={{fontFamily:"Inter,system-ui", background:"#fff", color:"#111"}}>
      {/* HEADER */}
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 24px",borderBottom:"1px solid #eee",position:"sticky",top:0,background:"#fff",zIndex:10}}>
        <div style={{fontWeight:700,letterSpacing:"-0.02em"}}>HERA <span style={{fontFamily:"serif",fontWeight:300,fontStyle:"italic"}}>by Aime®</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{width:36,height:36,borderRadius:999,border:"1px solid #ddd",display:"grid",placeItems:"center"}}>⌕</span>
          <span style={{background:"#111",color:"#fff",padding:"10px 16px",borderRadius:999,fontSize:13}}>＋ Ajouter un morceau</span>
          <span style={{width:36,height:36,borderRadius:999,border:"1px solid #ddd",display:"grid",placeItems:"center"}}>☰</span>
        </div>
      </header>

      {/* HERO avec MeshGradient */}
      <div style={{position:"relative",overflow:"hidden",padding:"80px 24px",textAlign:"center",color:"#fff"}}>
        <div style={{position:"absolute",inset:0,zIndex:0}}>
          <MeshGradient speed={0.41} scale={1} distortion={0.8} swirl={0.1} colors={['#FF6295', '#00A6CA', '#00AAE1', '#6200F7']} style={{height:"100%",width:"100%"}} />
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.25)"}} />
        </div>
        <div style={{position:"relative",zIndex:1}}>
          <p style={{fontSize:11,letterSpacing:"0.2em",opacity:0.9}}>HERA · COMPOSITION MUSICALE DE MARIAGE</p>
          <h1 style={{fontSize:42,fontWeight:700,lineHeight:1.05,margin:"16px auto",maxWidth:640,letterSpacing:"-0.03em"}}>Votre playlist devient le déroulé de votre mariage</h1>
          <p style={{opacity:0.95, maxWidth:520, margin:"0 auto", fontSize:15, lineHeight:1.5}}>Chaque morceau porte son heure de passage, la personne qui l'a choisi et le souvenir qui va avec. La musique devrait être les mots de l'âme.</p>
          <div style={{marginTop:24, background:"#fff",color:"#111",display:"inline-block",padding:"12px 22px",borderRadius:999,fontSize:13,fontWeight:600,boxShadow:"0 10px 30px rgba(0,0,0,0.2)"}}>Ouvrir la composition →</div>
          <p style={{marginTop:12,fontSize:11,opacity:0.8}}>MeshGradient · Paper Design — plus moderne que la photo nuages</p>
        </div>
      </div>

      {/* COMPOSITION HEADER */}
      <div style={{maxWidth:900, margin:"32px auto", padding:"0 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16}}>
          <div>
            <h2 style={{fontSize:28,fontWeight:700,letterSpacing:"-0.03em"}}>Composition</h2>
            <p style={{color:"#666",fontSize:13,marginTop:4}}>La timeline réelle de votre journée, morceau par morceau.</p>
          </div>
          <div style={{display:"flex",gap:8}}>
            <span style={{background:"#111",color:"#fff",padding:"8px 14px",borderRadius:999,fontSize:13}}>✦ Générer</span>
            <span style={{border:"1px solid #ddd",padding:"8px 14px",borderRadius:999,fontSize:13}}>＋ Moment</span>
          </div>
        </div>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:16, fontSize:13}}>
          <span style={{background:"#f5f5f5",padding:"6px 12px",borderRadius:999}}>78 morceaux · 5 h 00</span>
          <span style={{background:"#f5f5f5",padding:"6px 12px",borderRadius:999}}>1 moment vide</span>
          <span style={{background:"#f5f5f5",padding:"6px 12px",borderRadius:999}}>Tous les créneaux tenus</span>
          <span style={{background:"#f5f5f5",padding:"6px 12px",borderRadius:999}}>70 sans intention · raconter</span>
        </div>

        <div style={{display:"flex",gap:8,marginTop:12,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{background:"#111",color:"#fff",padding:"6px 12px",borderRadius:999,fontSize:12}}>◷ Chronologique</span>
          <span style={{border:"1px solid #eee",padding:"6px 12px",borderRadius:999,fontSize:12}}>☰ Liste</span>
          <span style={{border:"1px solid #eee",padding:"6px 12px",borderRadius:999,fontSize:12,flex:1}}>⌕ Titre ou artiste...</span>
          <span style={{border:"1px solid #eee",padding:"6px 12px",borderRadius:999,fontSize:12}}>Toutes les personnes ▾</span>
        </div>

        <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
          {["Tous","À valider","Incontournables","Interdits","Sans moment","Sans personne","Sans raison","Avec souvenir"].map(t=><span key={t} style={{background: t==="Tous"?"#111":"#fff", color: t==="Tous"?"#fff":"#111", border:"1px solid #ddd", padding:"6px 10px", borderRadius:999, fontSize:12}}>{t}</span>)}
        </div>

        {/* TIMELINE */}
        <div style={{marginTop:24, borderLeft:"1px solid #eee", paddingLeft:16, position:"relative"}}>
          {[
            {time:"09:30", title:"Accueil", count:"2 morceaux · 7 min · fin 09:37", tracks:[
              {title:"Un peu de rêve (feat. Claudio Capeo)", artist:"Vitaa", tag:"PROPOSÉ", color:"#6b2d5b", badge:"NORMAL"},
              {title:"Here Comes the Sun", artist:"The Beatles", tag:"PROPOSÉ", quote:"Pour l'arrivée des invités.", color:"#b45309", badge:"NORMAL"},
            ]},
            {time:"12:00", title:"Cérémonie", count:"0 morceau · fin 12:00", empty:true},
            {time:"14:00", title:"Cocktail", count:"2 morceaux · 6 min · fin 14:06", tracks:[
              {title:"La vie en rose", artist:"Édith Piaf", tag:"VALIDÉ", badge:"IMPORTANT", quote:"Pour la French touch du cocktail.", color:"#8b5cf6"},
              {title:"Fly Me to the Moon (feat. Count Basie and His Orchestra)", artist:"Frank Sinatra", tag:"PROPOSÉ", badge:"NORMAL", color:"#06b6d4"},
            ]},
            {time:"19:00", title:"Dîner", count:"1 morceau · 3 min · fin 19:03", tracks:[
              {title:"Je l'aime à mourir", artist:"Francis Cabrel", tag:"PROPOSÉ", badge:"NORMAL", color:"#f43f5e"},
            ]},
            {time:"21:30", title:"Ouverture de bal", count:"3 morceaux · 16 min · fin 21:46", tracks:[
              {title:"Perfect", artist:"Ed Sheeran", tag:"PROPOSÉ", quote:"Notre première danse.", badge:"INCONTOURNABLE", color:"#4c1d95"},
            ]},
          ].map(m=>(
            <section key={m.title} style={{paddingBottom:20}}>
              <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                <div style={{width:8,height:8,background:"#111",borderRadius:999, marginLeft:-20}}></div>
                <span style={{fontSize:13,color:"#666"}}>{m.time}</span>
                <span style={{fontSize:18,fontWeight:600}}>{m.title}</span>
                <span style={{fontSize:11,color:"#888"}}>{m.count}</span>
              </div>
              {m.empty ? <p style={{fontSize:12,color:"#999",fontStyle:"italic",marginTop:8}}>Aucun morceau — glissez-en un ici.</p> :
              <div style={{marginTop:10, display:"flex",flexDirection:"column",gap:8}}>
                {m.tracks.map(t=>(
                  <div key={t.title} style={{border:"1px solid #e5e5e5",borderRadius:12,padding:12,display:"flex",gap:12,background:"#fff"}}>
                    <img src={`https://picsum.photos/seed/${encodeURIComponent(t.title)}/48/48`} style={{width:48,height:48,borderRadius:8,objectFit:"cover"}} alt="" />
                    <div style={{background:t.color,width:28,height:28,borderRadius:999,display:"grid",placeItems:"center",color:"#fff",fontSize:10}}>▶</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
                        <div><div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.title}</div><div style={{fontSize:11,color:"#666"}}>{t.artist}</div></div>
                        <span style={{fontSize:10,background:t.badge==="INCONTOURNABLE"?"#111":t.badge==="IMPORTANT"?"#f5f5f5":"#f5f5f5",color:t.badge==="INCONTOURNABLE"?"#fff":"#666",padding:"4px 8px",borderRadius:6,height:"fit-content"}}>{t.badge}</span>
                      </div>
                      <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
                        <span style={{fontSize:11,color:"#888"}}>◷ {m.title}</span>
                        <span style={{fontSize:11,background:"#f5f5f5",padding:"2px 6px",borderRadius:6}}>Élégant</span>
                        <span style={{fontSize:10,color:"#888",background:"#f5f5f5",padding:"2px 6px",borderRadius:6}}>{t.tag}</span>
                      </div>
                      {t.quote && <div style={{fontSize:11,color:"#888",fontStyle:"italic",marginTop:4}}>« {t.quote} »</div>}
                    </div>
                  </div>
                ))}
              </div>}
            </section>
          ))}
        </div>
      </div>

      {/* MIX PANEL PREVIEW */}
      <div style={{position:"sticky",bottom:0,background:"#fff",borderTop:"1px solid #ddd",padding:12, display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",maxWidth:900,margin:"0 auto"}}>
        <span style={{background:"#111",color:"#fff",padding:"8px 12px",borderRadius:999,fontSize:12}}>▶ Jouer la composition</span>
        <span style={{border:"1px solid #ddd",padding:"6px 10px",borderRadius:999,fontSize:11}}>0 morceau(x) prêt(s) sur 78</span>
        <span style={{marginLeft:"auto",fontSize:11,color:"#666"}}>0:00 / 0:00</span>
      </div>
      <div style={{background:"#fafafa",borderTop:"1px solid #eee",padding:16, maxWidth:900, margin:"0 auto", display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{border:"1px solid #ddd",padding:"6px 10px",borderRadius:999,fontSize:12}}>🔒 Lecture continue verrouillée</span>
        <span style={{background:"#111",color:"#fff",padding:"8px 12px",borderRadius:999,fontSize:12}}>Valider la composition · 49€</span>
        <span style={{fontSize:11,color:"#666",maxWidth:340}}>Débloque le mix continu, la feuille de route DJ et les exports. Aucun fichier musical n'est vendu par HERA.</span>
      </div>
      <div style={{textAlign:"center",padding:20,color:"#999",fontSize:11}}>HERA by AIME® — Preview design fidèle aux captures Base44</div>
    </div>
  );
}
