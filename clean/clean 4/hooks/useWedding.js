import React, { createContext, useContext } from "react";
const Ctx = createContext(null);
export function WeddingProvider({ children }) { return React.createElement(Ctx.Provider, { value: {
  items: [], moments: [], songs: [], people: [], participations: [],
  songById: {}, personById: {}, momentById: {},
  weddingId: "demo", wedding: { validated: false, title: "Demo" },
  isLoading: false, hasNoWedding: false,
  refresh: ()=>{}, patchItems: ()=>{}, setWizardOpen: ()=>{}, setSearchOpen: ()=>{},
  drillItemId: null, setDrillItemId: ()=>{}, weddings: [], setWeddingId: ()=>{}
}}, children); }
export const useWedding = () => useContext(Ctx);
