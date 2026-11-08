<script setup lang="ts">
import type { UpgradeTier } from "../data/upgrades.ts";
import { orderedCosts } from "../data/totals.ts";
import CostChip from "./CostChip.vue";

defineProps<{ tier: UpgradeTier }>();
</script>

<template>
  <li class="tier">
    <h3 class="tier__title">
      Tier {{ tier.label }} <span class="tier__sep">·</span> {{ tier.effect }}
    </h3>
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
  padding: 12px 14px;
}

.tier + .tier {
  border-top: 1px solid var(--line);
}

.tier__title {
  margin-bottom: 8px;
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
</style>
