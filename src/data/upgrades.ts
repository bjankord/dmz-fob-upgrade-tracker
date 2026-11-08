import type { ItemName } from "./items.ts";

export interface ItemCost {
  item: ItemName;
  qty: number;
}

export interface UpgradeTier {
  /** Tier label as shown in game: "I", "II", … or "U" / "E" for ingredient printing. */
  label: string;
  /** What the tier unlocks, e.g. "Cap $250K" or "+18 item slots". */
  effect: string;
  /** Cash cost in dollars, when the tier has one. */
  cash?: number;
  costs: ItemCost[];
}

export interface UpgradeTrack {
  id: string;
  name: string;
  /** Lower-case name used in "used in" lists, e.g. "Stash items III". */
  shortName: string;
  /** Requirement or note shown at the right of the heading. */
  meta: string;
  /** Which column the track sits in on wide screens. */
  column: 1 | 2;
  tiers: UpgradeTier[];
}

const K = 1_000;

export const UPGRADE_TRACKS: UpgradeTrack[] = [
  {
    id: "bank",
    name: "Bank",
    shortName: "Bank",
    meta: "Cash cap · from $100K",
    column: 1,
    tiers: [
      { label: "I", effect: "Cap $250K", cash: 20 * K, costs: [] },
      { label: "II", effect: "Cap $500K", cash: 50 * K, costs: [] },
      {
        label: "III",
        effect: "Cap $1M",
        cash: 100 * K,
        costs: [{ item: "Infantry Invasion Plans", qty: 5 }],
      },
      {
        label: "IV",
        effect: "Cap $2M",
        cash: 200 * K,
        costs: [
          { item: "Ballistic Flight Logs", qty: 5 },
          { item: "Regional Combat Notes", qty: 5 },
        ],
      },
      {
        label: "V",
        effect: "Cap $5M",
        cash: 500 * K,
        costs: [{ item: "Degraded Execution Footage", qty: 10 }],
      },
      {
        label: "VI",
        effect: "Cap $10M",
        cash: 500 * K,
        costs: [
          { item: "Nuclear Program Files", qty: 10 },
          { item: "Encrypted Archive", qty: 10 },
        ],
      },
      {
        label: "VII",
        effect: "Cap $25M",
        cash: 500 * K,
        costs: [{ item: "W.M.D Manifest", qty: 10 }],
      },
      {
        label: "VIII",
        effect: "Cap $50M",
        cash: 500 * K,
        costs: [
          { item: "Foreign Intelligence Targets", qty: 10 },
          { item: "Cipher Code Ledger", qty: 10 },
        ],
      },
      {
        label: "IX",
        effect: "Cap $100M",
        cash: 500 * K,
        costs: [{ item: "Sanctioned Assassination List", qty: 10 }],
      },
      {
        label: "X",
        effect: "Cap $250M",
        cash: 500 * K,
        costs: [{ item: "Gold Bar", qty: 10 }],
      },
      {
        label: "XI",
        effect: "Cap $500M",
        cash: 500 * K,
        costs: [{ item: "Gold Skull", qty: 10 }],
      },
      {
        label: "XII",
        effect: "Cap $1B",
        costs: [
          { item: "Gold Bar", qty: 20 },
          { item: "Gold Skull", qty: 20 },
          { item: "Irradiated Container", qty: 3 },
          { item: "Fulton Drop Marker", qty: 3 },
        ],
      },
      {
        label: "XIII",
        effect: "Cap $2B",
        costs: [
          { item: "Reactor DRC Locker", qty: 1 },
          { item: "Shopping DRC Locker", qty: 1 },
          { item: "Air Base DRC Weapons Locker", qty: 1 },
          { item: "Dmoz Breacher Charge", qty: 5 },
        ],
      },
    ],
  },
  {
    id: "gunsmith",
    name: "Gunsmith",
    shortName: "Gunsmith",
    meta: "DMZ Lvl 10",
    column: 1,
    tiers: [
      {
        label: "I",
        effect: "−5% Gunsmith prices",
        cash: 50 * K,
        costs: [
          { item: "Reactive Metals", qty: 20 },
          { item: "CPU", qty: 10 },
          { item: "Power Regulators", qty: 5 },
        ],
      },
      {
        label: "II",
        effect: "−5% Gunsmith prices",
        cash: 100 * K,
        costs: [
          { item: "Nitro Compounds", qty: 20 },
          { item: "Comms Module", qty: 10 },
          { item: "Military Composites", qty: 10 },
        ],
      },
    ],
  },
  {
    id: "vendor-items",
    name: "Vendor Items",
    shortName: "Vendor items",
    meta: "DMZ Lvl 5 · Bank II",
    column: 1,
    tiers: [
      {
        label: "I",
        effect: "More Vendor offers",
        costs: [
          { item: "Electronic Sensors", qty: 20 },
          { item: "CPU", qty: 10 },
          { item: "Printed Circuit Board", qty: 10 },
          { item: "Prototype RF Module", qty: 2 },
        ],
      },
      {
        label: "II",
        effect: "More Vendor offers",
        costs: [
          { item: "Control Units", qty: 20 },
          { item: "High-Tenacity Fibres", qty: 10 },
          { item: "Nylon Cloth", qty: 10 },
          { item: "Nano-Structured Alloy", qty: 2 },
        ],
      },
    ],
  },
  {
    id: "stash-items",
    name: "Stash · Items",
    shortName: "Stash items",
    meta: "3D Printer · Lvl 2",
    column: 2,
    tiers: [
      {
        label: "I",
        effect: "+18 item slots",
        cash: 10 * K,
        costs: [
          { item: "Rigid Synthetics", qty: 10 },
          { item: "Electronic Sensors", qty: 10 },
        ],
      },
      {
        label: "II",
        effect: "+18 item slots",
        cash: 50 * K,
        costs: [
          { item: "Detonators", qty: 20 },
          { item: "Nylon Cloth", qty: 10 },
          { item: "Power Regulators", qty: 5 },
        ],
      },
      {
        label: "III",
        effect: "+18 item slots",
        cash: 100 * K,
        costs: [
          { item: "Binding Catalyst", qty: 20 },
          { item: "Stock Rod", qty: 20 },
          { item: "Alloyed Plating", qty: 10 },
        ],
      },
      {
        label: "IV",
        effect: "+18 item slots",
        costs: [
          { item: "Gold Skull", qty: 5 },
          { item: "Alloyed Plating", qty: 30 },
          { item: "Experimental Compounds", qty: 10 },
          { item: "Tuned Components", qty: 30 },
        ],
      },
    ],
  },
  {
    id: "stash-weapons",
    name: "Stash · Weapons",
    shortName: "Stash weapons",
    meta: "3D Printer · Lvl 2",
    column: 2,
    tiers: [
      {
        label: "I",
        effect: "+6 weapon slots",
        cash: 50 * K,
        costs: [
          { item: "Reactive Metals", qty: 20 },
          { item: "Stock Rod", qty: 10 },
          { item: "Comms Module", qty: 5 },
        ],
      },
      {
        label: "II",
        effect: "+6 weapon slots",
        cash: 100 * K,
        costs: [
          { item: "Structural Alloy", qty: 20 },
          { item: "High-Tenacity Fibres", qty: 20 },
          { item: "Tuned Components", qty: 10 },
        ],
      },
      {
        label: "III",
        effect: "+6 weapon slots",
        costs: [
          { item: "Gold Bar", qty: 5 },
          { item: "Stabilized Reagents", qty: 30 },
          { item: "Volatile Explosives", qty: 30 },
          { item: "Nano-Structured Alloy", qty: 10 },
        ],
      },
    ],
  },
  {
    id: "dog-tag-case",
    name: "Dog Tag Case",
    shortName: "Dog Tag Case",
    meta: "DMZ Lvl 20",
    column: 2,
    tiers: [
      {
        label: "I",
        effect: "+20 tag slots",
        cash: 10 * K,
        costs: [
          { item: "Rigid Synthetics", qty: 10 },
          { item: "Biomaterials", qty: 10 },
        ],
      },
      {
        label: "II",
        effect: "+20 tag slots",
        cash: 50 * K,
        costs: [
          { item: "Detonators", qty: 20 },
          { item: "Nylon Cloth", qty: 10 },
          { item: "Power Regulators", qty: 5 },
        ],
      },
      {
        label: "III",
        effect: "+20 tag slots",
        cash: 100 * K,
        costs: [
          { item: "Printed Circuit Board", qty: 10 },
          { item: "Structural Alloy", qty: 10 },
          { item: "Power Regulators", qty: 5 },
        ],
      },
      {
        label: "IV",
        effect: "+20 tag slots",
        cash: 200 * K,
        costs: [
          { item: "CPU", qty: 20 },
          { item: "Stabilized Reagents", qty: 10 },
          { item: "Experimental Compounds", qty: 5 },
        ],
      },
    ],
  },
  {
    id: "mia-recovery",
    name: "MIA Recovery",
    shortName: "MIA recovery",
    meta: "−5% per tier",
    column: 2,
    tiers: [
      {
        label: "I",
        effect: "−5% rescue cost",
        costs: [
          { item: "Regional Combat Notes", qty: 5 },
          { item: "Control Units", qty: 10 },
          { item: "Rigid Synthetics", qty: 10 },
        ],
      },
      {
        label: "II",
        effect: "−5% rescue cost",
        costs: [
          { item: "Nuclear Program Files", qty: 5 },
          { item: "Degraded Execution Footage", qty: 5 },
          { item: "Binding Catalyst", qty: 10 },
          { item: "Nitro Compounds", qty: 10 },
        ],
      },
      {
        label: "III",
        effect: "−5% rescue cost",
        costs: [
          { item: "W.M.D Manifest", qty: 5 },
          { item: "Foreign Intelligence Targets", qty: 5 },
          { item: "Power Regulators", qty: 10 },
          { item: "Comms Module", qty: 10 },
        ],
      },
      {
        label: "IV",
        effect: "−5% rescue cost",
        costs: [
          { item: "Sanctioned Assassination List", qty: 5 },
          { item: "Ballistic Fabric", qty: 30 },
          { item: "Nylon Laminate", qty: 30 },
          { item: "Prototype RF Module", qty: 10 },
        ],
      },
    ],
  },
  {
    id: "ingredient-printing",
    name: "Ingredient Printing",
    shortName: "Ingredient printing",
    meta: "3D Printer · Lvl 2",
    column: 2,
    tiers: [
      {
        label: "U",
        effect: "Print Uncommon ingredients",
        cash: 50 * K,
        costs: [
          { item: "Biomaterials", qty: 20 },
          { item: "High-Tenacity Fibres", qty: 10 },
          { item: "Comms Module", qty: 5 },
        ],
      },
      {
        label: "E",
        effect: "Print Epic ingredients",
        cash: 100 * K,
        costs: [
          { item: "Binding Catalyst", qty: 10 },
          { item: "Printed Circuit Board", qty: 10 },
          { item: "Military Composites", qty: 5 },
        ],
      },
    ],
  },
];
