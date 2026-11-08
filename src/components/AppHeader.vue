<script setup lang="ts">
import { RARITIES, RARITY_LABELS } from "../data/items.ts";
</script>

<template>
  <header class="header">
    <div class="header__eyebrow">
      <span>MW4 DMZ · 3D Printer · Upgrades</span>
      <span>Community-reported costs</span>
    </div>
    <h1 class="header__title">DMZ FOB Upgrade Tracker</h1>
    <p class="header__intro">
      Every known tier, what it needs and how many. Text and outline colors show each item's rarity;
      in every tier, valuables come before ingredients.
    </p>
    <ul class="legend" aria-label="Legend">
      <li class="legend__cash">$ Cash</li>
      <li v-for="rarity in RARITIES" :key="rarity" class="legend__rarity" :data-rarity="rarity">
        {{ RARITY_LABELS[rarity] }}
      </li>
    </ul>
  </header>
</template>

<style scoped>
.header {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}

.header__eyebrow {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  margin-bottom: 10px;
  font-size: 0.625rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.header__title {
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 13vw, 4.75rem);
  font-weight: 400;
  line-height: 0.95;
  text-transform: uppercase;
  color: var(--text);
}

.header__intro {
  max-width: 60ch;
  margin-top: 12px;
  font-size: 0.8125rem;
  color: #bdb8a6;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-top: 14px;
  font-size: 0.6875rem;
}

.legend__cash {
  padding: 3px 7px;
  border: 1px solid #55564b;
  border-radius: var(--radius);
  background: #3a3b33;
  font-weight: 700;
}

.legend__rarity {
  font-weight: 700;
  color: var(--rarity);
}
</style>
