// BulkBuyButton.jsx — VERSION SIMPLE (affiliation, sans API 7digital)
// 1 clic = ouvre une page panier avec tous les liens Qobuz/Beatport pré-remplis
// Toi tu touches l'affiliation, tu ne vends rien = 100% légal

import React from "react";
import { ShoppingBag, ExternalLink } from "lucide-react";
import { storeLinks, estimateBasket } from "@/lib/purchase";

export default function BulkBuyButton({ items, songById }) {
  const missing = items.filter(i => !i.audio_url && i.priority !== "interdit");
  const { count, estimate } = estimateBasket(items, songById);

  if (count === 0) return null;

  const openBasket = () => {
    // Ouvre le panier groupé — page simple avec la liste
    const w = window.open("", "_blank");
    const rows = missing.map(i => {
      const s = songById[i.song_id];
      return `<tr>
        <td style="padding:8px;border-bottom:1px solid #eee">${s?.title || ""}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;color:#666">${s?.artist || ""}</td>
        <td style="padding:8px;border-bottom:1px solid #eee">
          <a href="${storeLinks(s)[0].href}" target="_blank" style="background:#111;color:#fff;padding:6px 10px;border-radius:9999px;text-decoration:none;font-size:12px">Qobuz 1,29€</a>
        </td>
      </tr>`;
    }).join("");

    w.document.write(`
      <html><head><title>Panier HERA — ${count} titres</title>
      <style>body{font-family:Inter,system-ui;padding:24px;max-width:800px;margin:auto}h1{font-size:22px}table{width:100%;border-collapse:collapse;margin-top:16px}</style>
      </head><body>
        <h1>🛒 ${count} morceaux à compléter — estimation ${estimate}€</h1>
        <p style="color:#666;font-size:13px">Clique sur Qobuz pour chaque titre. HERA ne vend aucun fichier — tu achètes chez Qobuz/Beatport et tu reviens déposer ton fichier dans HERA. Tu peux aussi acheter titre par titre depuis HERA.</p>
        <p style="background:#f6f6f6;padding:10px;border-radius:8px;font-size:12px">Astuce : ouvre 5-6 onglets à la fois, achète, puis reviens. Ton affiliation HERA est comptée.</p>
        <table><thead><tr><th align="left">Titre</th><th align="left">Artiste</th><th></th></tr></thead><tbody>${rows}</tbody></table>
        <p style="margin-top:20px;font-size:12px;color:#999">HERA by AIME® — Aucun fichier musical n'est vendu par HERA. Achats chez nos partenaires.</p>
      </body></html>
    `);
    w.document.close();
  };

  return (
    <button onClick={openBasket} className="brand-btn-dark !py-2 flex items-center gap-2">
      <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
      Tout acheter en 1 clic — {count} titres · ~{estimate}€ sur Qobuz
      <ExternalLink className="w-3 h-3 opacity-60" />
    </button>
  );
}
