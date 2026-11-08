<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from "vue";

const props = defineProps<{
  /** Tier name for screen readers, e.g. "Bank Tier XII". */
  label: string;
  completed: boolean;
}>();

const emit = defineEmits<{ toggle: [] }>();
const open = defineModel<boolean>("open", { default: false });

const menuId = useId();
const root = ref<HTMLElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);
const item = ref<HTMLButtonElement | null>(null);

function close(returnFocus = false): void {
  open.value = false;
  if (returnFocus) button.value?.focus();
}

function onToggle(): void {
  emit("toggle");
  close(true);
}

function onPointerDown(event: PointerEvent): void {
  if (!root.value?.contains(event.target as Node)) close();
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.key === "Escape") close(true);
}

watch(open, async (isOpen) => {
  if (isOpen) {
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    await nextTick();
    item.value?.focus();
  } else {
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKeyDown);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <div ref="root" class="menu">
    <button
      ref="button"
      type="button"
      class="menu__button"
      :aria-label="`Options for ${props.label}`"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="menuId"
      @click="open = !open"
    >
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <circle cx="8" cy="3" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="8" cy="13" r="1.5" />
      </svg>
    </button>
    <div v-show="open" :id="menuId" class="menu__list" role="menu" :aria-label="props.label">
      <button
        ref="item"
        type="button"
        class="menu__item"
        role="menuitemcheckbox"
        :aria-checked="props.completed"
        @click="onToggle"
      >
        <span class="menu__check" aria-hidden="true">{{ props.completed ? "✓" : "" }}</span>
        {{ props.completed ? "Mark as not completed" : "Mark as completed" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: relative;
  flex-shrink: 0;
}

.menu__button {
  display: grid;
  place-items: center;
  /* 36px keeps a comfortable tap target without crowding the title. */
  width: 36px;
  height: 36px;
  margin: -8px -10px -8px 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.menu__button svg {
  fill: currentColor;
}

.menu__button:hover,
.menu__button[aria-expanded="true"] {
  border-color: var(--line-strong);
  background: var(--panel-raised);
  color: var(--text);
}

.menu__button:focus-visible,
.menu__item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.menu__list {
  position: absolute;
  top: calc(100% + 10px);
  right: -10px;
  min-width: 220px;
  padding: 4px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--panel-raised);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.5);
}

.menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}

.menu__item:hover {
  background: #2c2d25;
}

.menu__check {
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid var(--line-strong);
  border-radius: 2px;
  color: var(--accent);
  font-size: 11px;
  line-height: 1;
}
</style>
