<script setup lang="ts">
import { UPGRADE_TRACKS } from "./data/upgrades.ts";
import { formatCash, totalCash, totalsByKind } from "./data/totals.ts";
import AppHeader from "./components/AppHeader.vue";
import SectionHeading from "./components/SectionHeading.vue";
import ItemTotalCard from "./components/ItemTotalCard.vue";
import UpgradePanel from "./components/UpgradePanel.vue";
import FreeUnlocks from "./components/FreeUnlocks.vue";

const valuables = totalsByKind(UPGRADE_TRACKS, "valuable");
const ingredients = totalsByKind(UPGRADE_TRACKS, "ingredient");
const cash = formatCash(totalCash(UPGRADE_TRACKS));
const columns = [1, 2].map((col) => UPGRADE_TRACKS.filter((track) => track.column === col));
</script>

<template>
  <main class="page">
    <AppHeader />

    <section class="section" aria-labelledby="dont-sell">
      <SectionHeading
        id="dont-sell"
        title="Don't sell these"
        note="Valuables, keys and gear · totals across every tier"
      />
      <ul class="grid grid--valuables">
        <ItemTotalCard v-for="entry in valuables" :key="entry.item" :entry="entry" />
      </ul>
    </section>

    <div class="section tracks">
      <div v-for="(tracks, i) in columns" :key="i" class="tracks__column">
        <UpgradePanel v-for="track in tracks" :key="track.id" :track="track" />
      </div>
    </div>

    <section class="section" aria-labelledby="shopping-list">
      <SectionHeading
        id="shopping-list"
        tone="alt"
        title="Ingredient shopping list"
        :note="`Totals across every tier, and where each is used · plus ${cash}+ cash`"
      />
      <ul class="grid grid--ingredients">
        <ItemTotalCard
          v-for="entry in ingredients"
          :key="entry.item"
          :entry="entry"
          layout="inline"
        />
      </ul>
    </section>

    <section class="section" aria-labelledby="free-unlocks">
      <SectionHeading id="free-unlocks" tone="plain" title="Free with DMZ level" />
      <FreeUnlocks />
    </section>

    <footer class="footer">
      Costs are community-reported, updated 5 Nov 2026 (DMZ Radar, DMZ Index, Detonated, GameFusion,
      CODCentral, PlayerAuctions, AllThings.how). Check the in-game menu before spending. Rarities
      from the CODMunity item database, with corrections checked in game.
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
  gap: 8px;
}

.grid--valuables {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid--ingredients {
  grid-template-columns: minmax(0, 1fr);
}

.tracks,
.tracks__column {
  display: grid;
  gap: 16px;
  align-content: start;
}

@media (min-width: 560px) {
  .grid--valuables {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid--ingredients {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .page {
    padding-top: 32px;
  }
  .grid--valuables {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid--ingredients {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .tracks {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.footer {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: 10px;
  line-height: 1.6;
  color: var(--text-faint);
}
</style>
