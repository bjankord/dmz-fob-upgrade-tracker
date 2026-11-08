<script setup lang="ts">
import type { ItemTotal } from "../data/totals.ts";

withDefaults(
  defineProps<{
    entry: ItemTotal;
    /** "stacked" puts the count above the name; "inline" puts it beside. */
    layout?: "stacked" | "inline";
  }>(),
  { layout: "stacked" },
);
</script>

<template>
  <li class="card" :class="`card--${layout}`" :data-rarity="entry.rarity">
    <p class="card__count">
      {{ entry.total }}<span v-if="layout === 'stacked'" class="card__times">×</span>
    </p>
    <div class="card__body">
      <h3 class="card__name">{{ entry.item }}</h3>
      <p class="card__used">{{ entry.usedIn.join(" · ") }}</p>
    </div>
  </li>
</template>

<style scoped>
.card {
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--rarity) 55%, transparent);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--rarity) 6%, var(--panel));
}

.card--inline {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.card__count {
  font-family: var(--font-display);
  line-height: 1;
}

.card--stacked .card__count {
  margin-bottom: 8px;
  font-size: 34px;
  color: var(--accent);
}

.card--inline .card__count {
  flex: 0 0 2.2ch;
  font-size: 26px;
  color: var(--rarity);
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
