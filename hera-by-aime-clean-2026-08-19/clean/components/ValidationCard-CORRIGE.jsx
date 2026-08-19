// components/ValidationCard.jsx — VERSION CORRIGÉE
// Avant : "Valider la composition · 49€" seul → angoisse des 78 achats
// Après : explication + estimation + légal

import React from "react";
import { useWedding } from "@/hooks/useWedding";
import { estimateBasket } from "@/lib/purchase";
import { Lock, Check, ShoppingCart } from "lucide-react";

export default function ValidationCard() {
  const { items, songById, wedding, setPanelOpen } = useWedding();
  const { count, estimate } = estimateBasket(items, songById);
  const validated = wedding?.validated;

  if (validated) {
    return (
      <div className="flex items-center gap-2 text-xs bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        <Check className="w-4 h-4 text-green-600" />
        <span className="font-medium">Composition validée</span>
        <span className="text-muted-foreground">— mix continu + feuille de route DJ débloqués</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <p className="text-sm font-medium">Lecture continue verrouillée</p>
          <span className="brand-tag">Prévisualisation 30s</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          <strong>49€ = votre composition (timeline, intentions, ordres, exports).</strong> Aucun fichier musical n'est vendu par HERA.
          <br />
          Ensuite : achetez les fichiers où vous voulez (Qobuz dès 1,29€) ou déposez vos MP3 déjà possédés.
          {count > 0 && (
            <span className="ml-1 inline-flex items-center gap-1 font-medium text-foreground">
              <ShoppingCart className="w-3 h-3" /> {count} à compléter · estimation {estimate}€ au total
            </span>
          )}
        </p>
      </div>
      <button
        onClick={async () => {
          // Stripe Checkout — remplace par ton endpoint
          const res = await fetch("/api/stripe/checkout", {
            method: "POST",
            body: JSON.stringify({ weddingId: wedding.id }),
          });
          const { url } = await res.json();
          window.location.href = url;
        }}
        className="brand-btn-dark shrink-0"
      >
        Valider la composition · 49€
      </button>
    </div>
  );
}
