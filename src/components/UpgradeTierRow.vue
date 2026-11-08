<script setup lang="ts">
import { computed, ref } from "vue";
import type { UpgradeTier, UpgradeTrack } from "../data/upgrades.ts";
import { orderedCosts } from "../data/totals.ts";
import { tierKey, useCompletedTiers } from "../data/completedTiers.ts";
import CostChip from "./CostChip.vue";
import TierMenu from "./TierMenu.vue";

const props = defineProps<{ track: UpgradeTrack; tier: UpgradeTier }>();

const { isCompleted, toggle } = useCompletedTiers();
const key = computed(() => tierKey(props.track.id, props.tier.label));
const completed = computed(() => isCompleted(key.value));
const menuOpen = ref(false);
</script>

<template>
  <li class="tier" :class="{ 'tier--completed': completed, 'tier--menu-open': menuOpen }">
    <div class="tier__header">
      <h3 class="tier__title">
        Tier {{ tier.label }} <span class="tier__sep">·</span> {{ tier.effect }}
        <span v-if="completed" class="visually-hidden">(completed)</span>
      </h3>
      <TierMenu
        v-model:open="menuOpen"
        :label="`${track.name} Tier ${tier.label}`"
        :completed="completed"
        @toggle="toggle(key)"
      />
    </div>
    <div class="tier__costs">
      <CostChip v-if="tier.cash" kind="cash" :amount="tier.cash" />
      <CostChip
        v-for="cost in orderedCosts(tier)"
        :key="cost.item"
        kind="item"
        :item="cost.item"
        :qty="cost.qty"
      />
    </div>
  </li>
</template>

<style scoped>
.tier {
  position: relative;
  /* Keeps the desaturating overlay blending with this tier only. */
  isolation: isolate;
  padding: 12px 14px;
  background: var(--panel);
}

.tier:last-child {
  border-radius: 0 0 var(--radius) var(--radius);
}

.tier + .tier {
  border-top: 1px solid var(--line);
}

/* Lift the tier with an open menu above the tiers after it. */
.tier--menu-open {
  z-index: 2;
}

.tier__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.tier__header :deep(.menu) {
  /* Sit above the overlay so the menu keeps its colors. */
  z-index: 1;
}

.tier__title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}

.tier__sep {
  color: var(--text-dim);
}

.tier__costs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tier--completed .tier__title {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  color: var(--text-dim);
}

/*
 * A neutral grey layer in "saturation" blend mode takes the colour out of
 * everything beneath it while keeping each element's lightness.
 */
.tier--completed::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #808080;
  mix-blend-mode: saturation;
  pointer-events: none;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
