<script setup lang="ts">
import type { ItemTotal } from "../data/totals.ts";

defineProps<{ entry: ItemTotal }>();
</script>

<template>
  <li class="card" :data-rarity="entry.rarity">
    <p class="card__count">{{ entry.total }}<span class="card__times">×</span></p>
    <h3 class="card__name">{{ entry.item }}</h3>
    <p class="card__used">{{ entry.usedIn.join(" · ") }}</p>
  </li>
</template>

<style scoped>
.card {
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--rarity) 55%, transparent);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--rarity) 6%, var(--panel));
}

.card__count {
  margin-bottom: 8px;
  font-family: var(--font-display);
  font-size: 34px;
  line-height: 1;
  color: var(--accent);
}

.card__times {
  font-size: 0.8em;
}

.card__name {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--rarity);
}

.card__used {
  margin-top: 4px;
  font-size: 10px;
  line-height: 1.4;
  color: var(--text-dim);
}
</style>
