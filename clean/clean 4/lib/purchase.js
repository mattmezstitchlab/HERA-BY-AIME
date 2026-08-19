// lib/purchase.js — Liens d'achat légaux (ne vend pas, redirige)
// HERA ne vend aucun fichier. Commission via affiliation si tu t'inscris.

export function storeLinks(song) {
  if (!song) return [];
  const q = encodeURIComponent(`${song.title} ${song.artist || ""}`.trim());
  // Liens affiliés — remplace par tes IDs d'affiliation Qobuz/Beatport
  return [
    {
      id: "qobuz",
      label: "Qobuz · FLAC/WAV (1,29€)",
      href: `https://www.qobuz.com/fr-fr/search?q=${q}`,
    },
    {
      id: "beatport",
      label: "Beatport · DJ (1,49€)",
      href: `https://www.beatport.com/search?q=${q}`,
    },
    {
      id: "itunes",
      label: "iTunes Store",
      href: `https://music.apple.com/search?term=${q}`,
    },
    {
      id: "junodownload",
      label: "JunoDownload",
      href: `https://www.junodownload.com/search/?q%5Ball%5D%5B%5D=${q}`,
    },
  ];
}

// Pour la Phase 2 : estimation panier
export function estimateBasket(items, songById, pricePerTrack = 1.29) {
  const missing = items.filter(i => !i.audio_url && i.priority !== "interdit");
  return {
    count: missing.length,
    estimate: (missing.length * pricePerTrack).toFixed(2),
    currency: "€"
  };
}
