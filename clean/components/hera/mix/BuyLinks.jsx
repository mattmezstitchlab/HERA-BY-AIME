import React from "react";
import { ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { storeLinks } from "@/lib/purchase";

// Bouton « Acheter » : ouvre les boutiques légales pour obtenir le fichier.
export default function BuyLinks({ song, label = "Acheter" }) {
  if (!song) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="brand-btn !py-2 shrink-0">
        <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} /> {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="brand-tag !bg-transparent !p-0 !mb-1">Acheter le fichier</DropdownMenuLabel>
        {storeLinks(song).map((s) => (
          <DropdownMenuItem key={s.id} onClick={() => window.open(s.href, "_blank", "noopener")}>
            {s.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
