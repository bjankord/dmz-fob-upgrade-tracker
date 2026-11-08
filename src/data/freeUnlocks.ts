export interface FreeUnlock {
  reward: string;
  levels: number[];
}

/** Rewards that come from DMZ level alone, no materials needed. */
export const FREE_UNLOCKS: FreeUnlock[] = [
  { reward: "+1 Active Duty slot", levels: [15] },
  { reward: "+1 Vendor weapon", levels: [18] },
  { reward: "+18 Stash item slots", levels: [22, 45, 70] },
  { reward: "Gunsmith −5%", levels: [25] },
  { reward: "Bounty payout +10 / 25 / 50 / 100%", levels: [28, 40, 50, 70] },
  { reward: "+4 Vendor items", levels: [32] },
  { reward: "+6 Stash weapon slots", levels: [35, 60] },
  { reward: "Print Tacticals · Lethals · Field Upgrades · Fire Support", levels: [4, 7, 12, 20] },
];
