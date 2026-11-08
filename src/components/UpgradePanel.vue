<script setup lang="ts">
import type { UpgradeTrack } from "../data/upgrades.ts";
import UpgradeTierRow from "./UpgradeTierRow.vue";

defineProps<{ track: UpgradeTrack }>();
</script>

<template>
  <section class="panel" :aria-labelledby="`track-${track.id}`">
    <header class="panel__header">
      <h2 :id="`track-${track.id}`" class="panel__title">{{ track.name }}</h2>
      <p class="panel__meta">{{ track.meta }}</p>
    </header>
    <ol class="panel__tiers">
      <UpgradeTierRow v-for="tier in track.tiers" :key="tier.label" :track="track" :tier="tier" />
    </ol>
  </section>
</template>

<style scoped>
.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.panel__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px 10px;
  border-bottom: 1px solid var(--line);
}

.panel__title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.panel__meta {
  flex-shrink: 0;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
}
</style>
