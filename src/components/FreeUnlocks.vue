<script setup lang="ts">
import { FREE_UNLOCKS } from "../data/freeUnlocks.ts";
</script>

<template>
  <ul class="unlocks">
    <li v-for="unlock in FREE_UNLOCKS" :key="unlock.reward" class="unlock">
      <p class="unlock__reward">{{ unlock.reward }}</p>
      <p class="unlock__levels">Level {{ unlock.levels.join(" · ") }}</p>
    </li>
  </ul>
</template>

<style scoped>
.unlocks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

@media (min-width: 900px) {
  .unlocks {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.unlock {
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}

.unlock__reward {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
}

.unlock__levels {
  margin-top: 4px;
  font-size: 10px;
  color: var(--text-dim);
}
</style>
