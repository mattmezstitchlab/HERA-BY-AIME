"use client";
import Link from "next/link";
import { MeshGradient } from '@paper-design/shaders-react';

export default function Landing() {
  return (
    <div style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, system-ui", background:"#fff", color:"#111"}}>
      {/* HEADER */}
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:"rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:20,borderBottom:"1px solid #eee"}}>
        <div style={{fontWeight:800,letterSpacing:"-0.04em"}}>HERA <span style={{fontWeight:300,fontFamily:"serif",fontStyle:"italic"}}>by Aime®</span></div>
        <Link href="/apple" style={{background:"#111",color:"#fff",padding:"9px 16px",borderRadius:999,fontSize:13,fontWeight:600,textDecoration:"none"}}>Ouvrir l'app →</Link>
      </header>

      {/* HERO */}
      <div style={{position:"relative",overflow:"hidden",textAlign:"center",padding:"70px 20px 50px",color:"#fff"}}>
        <div style={{position:"absolute",inset:0}}>
          <MeshGradient speed={0.3} scale={1.1} distortion={0.75} swirl={0.07} colors={['#FF3B7F','#00C2FF','#7B61FF','#FF8A00']} style={{height:"100%",width:"100%"}} />
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.28)"}} />
        </div>
        <div style={{position:"relative",zIndex:1,maxWidth:760,margin:"0 auto"}}>
          <p style={{fontSize:10,letterSpacing:"0.2em",opacity:0.9,background:"rgba(255,255,255,0.14)",display:"inline-block",padding:"6px 10px",borderRadius:999,backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.18)"}}>HERA · COMPOSITION MUSICALE DE MARIAGE</p>
          <h1 style={{fontSize:44,fontWeight:900,lineHeight:0.92,margin:"18px auto",letterSpacing:"-0.05em",maxWidth:640}}>Votre playlist devient le déroulé de votre mariage</h1>
          <p style={{fontSize:14,lineHeight:1.5,opacity:0.92,maxWidth:520,margin:"0 auto"}}>Chaque morceau porte son heure de passage, la personne qui l'a choisi et le souvenir qui va avec. La musique devrait être les mots de l'âme.</p>
          <Link href="/apple" style={{display:"inline-block",marginTop:20,background:"#fff",color:"#111",padding:"12px 22px",borderRadius:999,fontSize:13,fontWeight:700,textDecoration:"none",boxShadow:"0 10px 30px rgba(0,0,0,0.18)"}}>Ouvrir la composition →</Link>
          <p style={{marginTop:10,fontSize:11,opacity:0.7}}>Sans RDV DJ · Mix auto · Film invités inclus</p>
        </div>
      </div>

      {/* 4 GESTES */}
      <div style={{maxWidth:1100,margin:"40px auto",padding:"0 20px"}}>
        <p style={{fontSize:10,letterSpacing:"0.14em",fontWeight:800,color:"#999"}}>COMMENT ÇA MARCHE</p>
        <h2 style={{fontSize:28,fontWeight:900,letterSpacing:"-0.03em",marginTop:6,lineHeight:1.1}}>Quatre gestes, et la journée se tient toute seule.</h2>
        <p style={{color:"#666",fontSize:13,marginTop:8,maxWidth:560}}>HERA ne fabrique pas une playlist : elle assemble le récit musical de votre mariage, du premier café à la dernière danse.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))",gap:14,marginTop:20}}>
          {[
            {n:"01", t:"Vous posez la journée", d:"Créez votre mariage, puis les moments : accueil, cérémonie, cocktail, dîner, ouverture, soirée. Chacun a son heure."},
            {n:"02", t:"Vous remplissez les créneaux", d:"Un créneau, un morceau. Vous ajoutez la raison, le souvenir, la personne — puis vous glissez dans l'ordre juste."},
            {n:"03", t:"Vos invités proposent", d:"Un lien unique, sans compte : chacun offre un morceau et raconte pourquoi. Vous acceptez, il entre."},
            {n:"04", t:"Le DJ reçoit la feuille de route", d:"Un second lien, en lecture seule : la journée heure par heure, les incontournables, les interdits. Aucun RDV nécessaire."},
          ].map(c=>(
            <div key={c.n} style={{background:"#111",color:"#fff",borderRadius:16,padding:18}}>
              <div style={{width:32,height:32,borderRadius:999,background:"rgba(255,255,255,0.12)",display:"grid",placeItems:"center",fontSize:11,marginBottom:12}}>◈</div>
              <div style={{fontSize:11,opacity:0.5}}>{c.n}</div>
              <div style={{fontSize:14,fontWeight:800,marginTop:4}}>{c.t}</div>
              <div style={{fontSize:12,opacity:0.7,marginTop:6,lineHeight:1.4}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ANATOMIE */}
      <div style={{maxWidth:1100,margin:"36px auto",padding:"0 20px"}}>
        <p style={{fontSize:10,letterSpacing:"0.14em",fontWeight:800,color:"#999"}}>ANATOMIE D'UN MORCEAU</p>
        <h2 style={{fontSize:24,fontWeight:900,letterSpacing:"-0.03em",marginTop:6}}>Quatre couches sur un seul titre</h2>
        <p style={{color:"#666",fontSize:12,marginTop:6,maxWidth:560}}>HERA ne tient qu'un seul fil : la musique — l'heure, les gens et les souvenirs s'y accrochent.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))",gap:12,marginTop:16}}>
          {[
            {t:"Le moment & l'heure", d:"Rangé dans un moment de la journée, il reçoit son heure de passage réelle, calculée sur sa durée."},
            {t:"L'auteur", d:"La personne qui l'a choisi — invité, témoin, grand-mère — reste attachée jusqu'au jour J."},
            {t:"L'intention", d:"Le pourquoi et le souvenir, écrits une fois : c'est ce que le DJ et vous relisez le jour J."},
            {t:"Le statut & la priorité", d:"Proposé, validé, planifié — et incontournable ou interdit, signalé sans ambiguïté."},
          ].map(c=>(
            <div key={c.t} style={{background:"#111",color:"#fff",borderRadius:16,padding:16}}>
              <div style={{width:28,height:28,borderRadius:999,background:"rgba(255,255,255,0.12)",display:"grid",placeItems:"center",fontSize:12}}>♡</div>
              <div style={{fontSize:13,fontWeight:700,marginTop:10}}>{c.t}</div>
              <div style={{fontSize:11,opacity:0.65,marginTop:6,lineHeight:1.4}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PREUVES */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"#eee",marginTop:30}}>
        {[
          {k:"LES PROPOSITIONS", t:"Un lien, et vos invités proposent", d:"Ils écrivent le titre et le pourquoi ; vous acceptez d'un geste et le morceau entre."},
          {k:"LES SOUVENIRS", t:"L'intention survit à la soirée", d:"Le souvenir attaché à un titre reste lisible bien après la dernière danse."},
          {k:"TOUTES LES GÉNÉRATIONS", t:"Chaque invité devient auteur d'un créneau", d:"Un morceau proposé par vos grands-parents : c'est leur moment, à leur heure."},
          {k:"LE JOUR J", t:"Une timeline prête pour le DJ", d:"Chaque morceau a son heure réelle. Les incontournables et interdits sont signalés."},
        ].map(c=>(
          <div key={c.k} style={{background:"#111",color:"#fff",padding:24,position:"relative",overflow:"hidden",minHeight:180}}>
            <div style={{position:"absolute",inset:0,opacity:0.18,background:`linear-gradient(135deg, #FF3B7F22, #00C2FF22)`}} />
            <div style={{position:"relative"}}>
              <span style={{fontSize:9,letterSpacing:"0.12em",background:"rgba(255,255,255,0.12)",padding:"4px 7px",borderRadius:999}}>{c.k}</span>
              <div style={{fontSize:16,fontWeight:800,marginTop:10,lineHeight:1.2}}>{c.t}</div>
              <div style={{fontSize:11,opacity:0.7,marginTop:6,lineHeight:1.4}}>{c.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{textAlign:"center",padding:"36px 20px",background:"#fcfcf9",borderTop:"1px solid #eee"}}>
        <h3 style={{fontSize:22,fontWeight:900,letterSpacing:"-0.02em"}}>Prêt à composer ?</h3>
        <p style={{color:"#666",fontSize:12,marginTop:6}}>Générez votre journée en 30 secondes. Sans RDV DJ.</p>
        <Link href="/apple" style={{display:"inline-block",marginTop:14,background:"#111",color:"#fff",padding:"12px 22px",borderRadius:999,fontSize:13,fontWeight:700,textDecoration:"none"}}>Ouvrir l'app →</Link>
        <div style={{marginTop:12,fontSize:11,color:"#999"}}>49€ · Mix continu · Film invités · Feuille de route DJ</div>
      </div>

      <div style={{textAlign:"center",padding:"14px",fontSize:11,color:"#999",borderTop:"1px solid #eee"}}>HERA by Aime® — Composition musicale de mariage</div>
    </div>
  );
}
