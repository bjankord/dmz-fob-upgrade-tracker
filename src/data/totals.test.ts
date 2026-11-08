import { describe, expect, it } from "vite-plus/test";
import { UPGRADE_TRACKS } from "./upgrades.ts";
import { allItemTotals, formatCash, orderedCosts, totalCash, totalsByKind } from "./totals.ts";

describe("totalsByKind", () => {
  it("sums valuables across every tier, most-needed first", () => {
    const valuables = totalsByKind(UPGRADE_TRACKS, "valuable");
    expect(valuables).toHaveLength(18);
    expect(valuables[0]).toEqual({
      item: "Gold Bar",
      rarity: "ultra",
      total: 35,
      usedIn: ["Bank X", "Bank XII", "Stash weapons III"],
    });
    expect(valuables.map((v) => v.total)).toEqual([
      35, 35, 15, 15, 15, 15, 15, 10, 10, 10, 5, 5, 5, 3, 3, 1, 1, 1,
    ]);
  });

  it("sums ingredients across every tier", () => {
    const ingredients = totalsByKind(UPGRADE_TRACKS, "ingredient");
    const byName = Object.fromEntries(ingredients.map((i) => [i.item, i.total]));
    expect(ingredients).toHaveLength(26);
    expect(byName["Binding Catalyst"]).toBe(40);
    expect(byName["Comms Module"]).toBe(30);
    expect(byName["Power Regulators"]).toBe(30);
    expect(byName["Nitro Compounds"]).toBe(30);
    expect(byName["Prototype RF Module"]).toBe(12);
  });
});

describe("allItemTotals", () => {
  it("lists all 44 items, valuables before ingredients", () => {
    const all = allItemTotals(UPGRADE_TRACKS);
    expect(all).toHaveLength(44);
    expect(all[0]?.item).toBe("Gold Bar");
    expect(all[17]?.item).toBe("Shopping DRC Locker");
    expect(all[18]?.item).toBe("Alloyed Plating");
  });
});

describe("completed tiers", () => {
  const done =
    (...keys: string[]) =>
    (track: { id: string }, tier: { label: string }) =>
      keys.includes(`${track.id}:${tier.label}`);

  it("hides an item once no remaining tier needs it", () => {
    const all = allItemTotals(UPGRADE_TRACKS, done("bank:III"));
    expect(all.find((e) => e.item === "Infantry Invasion Plans")).toBeUndefined();
    expect(all).toHaveLength(43);
  });

  it("subtracts a completed tier's quantity and drops it from where it's used", () => {
    const goldBar = allItemTotals(UPGRADE_TRACKS, done("bank:X")).find(
      (e) => e.item === "Gold Bar",
    );
    expect(goldBar?.total).toBe(25);
    expect(goldBar?.usedIn).toEqual(["Bank XII", "Stash weapons III"]);
  });

  it("only counts cash for tiers that are not done", () => {
    expect(formatCash(totalCash(UPGRADE_TRACKS, done("bank:I", "bank:II")))).toBe("$4.77M");
  });
});

describe("totalCash", () => {
  it("adds up every tier's cash cost", () => {
    expect(formatCash(totalCash(UPGRADE_TRACKS))).toBe("$4.84M");
  });
});

describe("orderedCosts", () => {
  it("puts valuables before ingredients", () => {
    const tier = {
      label: "X",
      effect: "",
      costs: [
        { item: "Alloyed Plating" as const, qty: 30 },
        { item: "Gold Skull" as const, qty: 5 },
      ],
    };
    expect(orderedCosts(tier).map((c) => c.item)).toEqual(["Gold Skull", "Alloyed Plating"]);
  });
});

describe("formatCash", () => {
  it.each([
    [20_000, "$20K"],
    [500_000, "$500K"],
    [1_000_000, "$1M"],
    [2_000_000_000, "$2B"],
  ])("formats %d as %s", (input, expected) => {
    expect(formatCash(input)).toBe(expected);
  });
});
