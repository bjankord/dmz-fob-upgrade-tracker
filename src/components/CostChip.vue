<script setup lang="ts">
import { computed } from "vue";
import { ITEMS, type ItemName } from "../data/items.ts";
import { formatCash } from "../data/totals.ts";

const props = defineProps<
  { kind: "cash"; amount: number } | { kind: "item"; item: ItemName; qty: number }
>();

const rarity = computed(() => (props.kind === "item" ? ITEMS[props.item].rarity : undefined));
</script>

<template>
  <span v-if="props.kind === 'cash'" class="chip chip--cash">{{ formatCash(props.amount) }}</span>
  <span v-else class="chip chip--item" :data-rarity="rarity"
    >{{ props.qty }}× {{ props.item }}</span
  >
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 3px 7px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  font-size: 0.6875rem;
  line-height: 1.3;
  white-space: nowrap;
}

.chip--cash {
  background: #3a3b33;
  border-color: #55564b;
  color: var(--text);
  font-weight: 700;
}

.chip--item {
  border-color: color-mix(in srgb, var(--rarity) 70%, transparent);
  background: color-mix(in srgb, var(--rarity) 8%, transparent);
  color: var(--rarity);
}
</style>
