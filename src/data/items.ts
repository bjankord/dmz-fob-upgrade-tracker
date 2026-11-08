export type Rarity = "ultra" | "legendary" | "epic" | "rare" | "uncommon";

/** Valuables, keys and gear are looted; ingredients are printed or bought. */
export type ItemKind = "valuable" | "ingredient";

export interface ItemInfo {
  rarity: Rarity;
  kind: ItemKind;
}

/** Rarity order, rarest first. Used for the legend. */
export const RARITIES: readonly Rarity[] = ["ultra", "legendary", "epic", "rare", "uncommon"];

export const RARITY_LABELS: Record<Rarity, string> = {
  ultra: "Ultra",
  legendary: "Legendary",
  epic: "Epic",
  rare: "Rare",
  uncommon: "Uncommon",
};

export const ITEMS = {
  // Valuables, keys and gear
  "Gold Bar": { rarity: "ultra", kind: "valuable" },
  "Gold Skull": { rarity: "ultra", kind: "valuable" },
  "Fulton Drop Marker": { rarity: "ultra", kind: "valuable" },
  "Irradiated Container": { rarity: "ultra", kind: "valuable" },
  "Air Base DRC Weapons Locker": { rarity: "ultra", kind: "valuable" },
  "Reactor DRC Locker": { rarity: "ultra", kind: "valuable" },
  "Shopping DRC Locker": { rarity: "ultra", kind: "valuable" },
  "Dmoz Breacher Charge": { rarity: "ultra", kind: "valuable" },
  "Sanctioned Assassination List": { rarity: "legendary", kind: "valuable" },
  "Foreign Intelligence Targets": { rarity: "epic", kind: "valuable" },
  "W.M.D Manifest": { rarity: "epic", kind: "valuable" },
  "Cipher Code Ledger": { rarity: "epic", kind: "valuable" },
  "Degraded Execution Footage": { rarity: "rare", kind: "valuable" },
  "Nuclear Program Files": { rarity: "rare", kind: "valuable" },
  "Encrypted Archive": { rarity: "rare", kind: "valuable" },
  "Regional Combat Notes": { rarity: "uncommon", kind: "valuable" },
  "Ballistic Flight Logs": { rarity: "uncommon", kind: "valuable" },
  "Infantry Invasion Plans": { rarity: "uncommon", kind: "valuable" },

  // Ingredients
  "Experimental Compounds": { rarity: "legendary", kind: "ingredient" },
  "Military Composites": { rarity: "legendary", kind: "ingredient" },
  "Nano-Structured Alloy": { rarity: "legendary", kind: "ingredient" },
  "Prototype RF Module": { rarity: "legendary", kind: "ingredient" },
  "Alloyed Plating": { rarity: "epic", kind: "ingredient" },
  "Ballistic Fabric": { rarity: "epic", kind: "ingredient" },
  "Comms Module": { rarity: "epic", kind: "ingredient" },
  "Nylon Laminate": { rarity: "epic", kind: "ingredient" },
  "Power Regulators": { rarity: "epic", kind: "ingredient" },
  "Volatile Explosives": { rarity: "epic", kind: "ingredient" },
  "Binding Catalyst": { rarity: "rare", kind: "ingredient" },
  CPU: { rarity: "rare", kind: "ingredient" },
  "High-Tenacity Fibres": { rarity: "rare", kind: "ingredient" },
  "Nitro Compounds": { rarity: "rare", kind: "ingredient" },
  "Nylon Cloth": { rarity: "rare", kind: "ingredient" },
  "Printed Circuit Board": { rarity: "rare", kind: "ingredient" },
  "Stock Rod": { rarity: "rare", kind: "ingredient" },
  "Structural Alloy": { rarity: "rare", kind: "ingredient" },
  Biomaterials: { rarity: "uncommon", kind: "ingredient" },
  "Control Units": { rarity: "uncommon", kind: "ingredient" },
  Detonators: { rarity: "uncommon", kind: "ingredient" },
  "Electronic Sensors": { rarity: "uncommon", kind: "ingredient" },
  "Reactive Metals": { rarity: "uncommon", kind: "ingredient" },
  "Rigid Synthetics": { rarity: "uncommon", kind: "ingredient" },
  "Stabilized Reagents": { rarity: "uncommon", kind: "ingredient" },
  "Tuned Components": { rarity: "uncommon", kind: "ingredient" },
} as const satisfies Record<string, ItemInfo>;

export type ItemName = keyof typeof ITEMS;

export function itemInfo(name: ItemName): ItemInfo {
  return ITEMS[name];
}
