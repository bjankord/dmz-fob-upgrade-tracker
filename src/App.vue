<script setup lang="ts">
import { computed } from "vue";
import { UPGRADE_TRACKS } from "./data/upgrades.ts";
import { allItemTotals, formatCash, totalCash, type TierDone } from "./data/totals.ts";
import { tierKey, useCompletedTiers } from "./data/completedTiers.ts";
import AppHeader from "./components/AppHeader.vue";
import SectionHeading from "./components/SectionHeading.vue";
import ItemTotalCard from "./components/ItemTotalCard.vue";
import UpgradePanel from "./components/UpgradePanel.vue";

const { isCompleted } = useCompletedTiers();
const isDone: TierDone = (track, tier) => isCompleted(tierKey(track.id, tier.label));

// Recomputed whenever a tier is marked completed or not completed.
const items = computed(() => allItemTotals(UPGRADE_TRACKS, isDone));
const cash = computed(() => totalCash(UPGRADE_TRACKS, isDone));
const note = computed(() =>
  cash.value > 0
    ? `Items your remaining upgrades need · plus ${formatCash(cash.value)} cash`
    : "Items your remaining upgrades need",
);
const columns = [1, 2].map((col) => UPGRADE_TRACKS.filter((track) => track.column === col));
</script>

<template>
  <main class="page">
    <AppHeader />

    <section class="section" aria-labelledby="dont-sell">
      <SectionHeading id="dont-sell" title="Don't sell these" :note="note" />
      <ul v-if="items.length" class="grid">
        <ItemTotalCard v-for="entry in items" :key="entry.item" :entry="entry" />
      </ul>
      <p v-else class="empty">Every tier is completed. Nothing left to save.</p>
    </section>

    <div class="section tracks">
      <div v-for="(tracks, i) in columns" :key="i" class="tracks__column">
        <UpgradePanel v-for="track in tracks" :key="track.id" :track="track" />
      </div>
    </div>

    <footer class="footer">
      Costs are community-reported, updated 5 Nov 2026 (DMZ Radar, DMZ Index, Detonated, GameFusion,
      CODCentral, PlayerAuctions, AllThings.how). Check the in-game menu before spending. Rarities
      from the CODMunity item database, with corrections checked in game.:
      <a
        href="https://www.reddit.com/r/DMZ/comments/1xfbqvh/stop_selling_your_documents_i_made_a_full/"
        >Original source from Reddit</a
      >
    </footer>
  </main>
</template>

<style scoped>
.page {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px var(--gutter) 32px;
}

.section {
  margin-top: 28px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.empty {
  padding: 16px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius);
  color: var(--text-dim);
}

.tracks,
.tracks__column {
  display: grid;
  gap: 16px;
  align-content: start;
}

@media (min-width: 560px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .page {
    padding-top: 32px;
  }
  .grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .tracks {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.footer {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: 0.625rem;
  line-height: 1.6;
  color: var(--text-faint);
}
</style>
