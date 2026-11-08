import { ITEMS, RARITIES, type ItemKind, type ItemName, type Rarity } from "./items.ts";
import type { ItemCost, UpgradeTier, UpgradeTrack } from "./upgrades.ts";

export interface ItemTotal {
  item: ItemName;
  rarity: Rarity;
  total: number;
  /** Where the item is spent, e.g. ["Bank X", "Stash weapons III"]. */
  usedIn: string[];
}

/** Says whether a tier is already done, so its costs no longer count. */
export type TierDone = (track: UpgradeTrack, tier: UpgradeTier) => boolean;

const noneDone: TierDone = () => false;

/**
 * Every item of one kind still needed by tiers that are not done, with its
 * total, most-needed first. Items no remaining tier needs are left out.
 */
export function totalsByKind(
  tracks: UpgradeTrack[],
  kind: ItemKind,
  isDone: TierDone = noneDone,
): ItemTotal[] {
  const totals = new Map<ItemName, ItemTotal>();

  for (const track of tracks) {
    for (const tier of track.tiers) {
      if (isDone(track, tier)) continue;
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

/** Cash still needed by tiers that are not done. */
export function totalCash(tracks: UpgradeTrack[], isDone: TierDone = noneDone): number {
  let sum = 0;
  for (const track of tracks) {
    for (const tier of track.tiers) {
      if (!isDone(track, tier)) sum += tier.cash ?? 0;
    }
  }
  return sum;
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

/**
 * Every item still needed, rarest first (Ultra to Uncommon). Within a rarity,
 * valuables come before ingredients, then most-needed first.
 */
export function allItemTotals(tracks: UpgradeTrack[], isDone: TierDone = noneDone): ItemTotal[] {
  const rank = (rarity: Rarity) => RARITIES.indexOf(rarity);
  // Array sort is stable, so the valuables-then-ingredients order holds within each rarity.
  return [
    ...totalsByKind(tracks, "valuable", isDone),
    ...totalsByKind(tracks, "ingredient", isDone),
  ].sort((a, b) => rank(a.rarity) - rank(b.rarity));
}
