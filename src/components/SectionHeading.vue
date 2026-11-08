<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    title: string;
    note?: string;
    tone?: "accent" | "plain";
  }>(),
  { tone: "accent" },
);
</script>

<template>
  <header class="heading">
    <h2 :id="id" class="heading__title" :class="`heading__title--${tone}`">{{ title }}</h2>
    <p v-if="note" class="heading__note">{{ note }}</p>
  </header>
</template>

<style scoped>
.heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 16px;
  margin-bottom: 12px;
}

.heading__title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 400;
  line-height: 1.05;
  text-transform: uppercase;
}

.heading__title--accent {
  color: var(--accent);
}
.heading__title--plain {
  color: var(--text);
}

.heading__note {
  font-size: 11px;
  color: var(--text-dim);
}
</style>
