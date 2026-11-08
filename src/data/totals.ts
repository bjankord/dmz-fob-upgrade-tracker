import { ITEMS, type ItemKind, type ItemName, type Rarity } from "./items.ts";
import type { ItemCost, UpgradeTier, UpgradeTrack } from "./upgrades.ts";

export interface ItemTotal {
  item: ItemName;
  rarity: Rarity;
  total: number;
  /** Where the item is spent, e.g. ["Bank X", "Stash weapons III"]. */
  usedIn: string[];
}

/** Every item of one kind, with its total across all tiers, most-needed first. */
export function totalsByKind(tracks: UpgradeTrack[], kind: ItemKind): ItemTotal[] {
  const totals = new Map<ItemName, ItemTotal>();

  for (const track of tracks) {
    for (const tier of track.tiers) {
      for (const { item, qty } of tier.costs) {
        const info = ITEMS[item];
        if (info.kind !== kind) continue;
        const entry = totals.get(item) ?? { item, rarity: info.rarity, total: 0, usedIn: [] };
        entry.total += qty;
        entry.usedIn.push(`${track.shortName} ${tier.label}`);
        totals.set(item, entry);
      }
    }
  }

  return [...totals.values()].sort((a, b) => b.total - a.total || a.item.localeCompare(b.item));
}

export function totalCash(tracks: UpgradeTrack[]): number {
  return tracks.reduce(
    (sum, track) => sum + track.tiers.reduce((tierSum, tier) => tierSum + (tier.cash ?? 0), 0),
    0,
  );
}

/** A tier's item costs with valuables first, then ingredients, keeping the listed order otherwise. */
export function orderedCosts(tier: UpgradeTier): ItemCost[] {
  const valuables = tier.costs.filter((c) => ITEMS[c.item].kind === "valuable");
  const ingredients = tier.costs.filter((c) => ITEMS[c.item].kind === "ingredient");
  return [...valuables, ...ingredients];
}

/** $20K, $500K, $4.84M, $2B. */
export function formatCash(dollars: number): string {
  const units: [number, string][] = [
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [size, suffix] of units) {
    if (dollars >= size) {
      const value = Math.round((dollars / size) * 100) / 100;
      return `$${value}${suffix}`;
    }
  }
  return `$${dollars}`;
}
