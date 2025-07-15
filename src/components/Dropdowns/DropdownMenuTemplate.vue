<template>
  <div class="dropdown" ref="dropdownRef">
    <slot name="button" :toggle="toggleDropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        @click="toggleDropdown"
        :aria-expanded="isOpen"
      >
        Dropdown
      </button>
    </slot>
    <ul class="dropdown-menu p-3 show" v-if="isOpen" @click.stop :style="menuStyle">
      <slot name="menu" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps<{
  menuMinWidth?: string
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Compute the style for the menu
const menuStyle = computed(() => (props.menuMinWidth ? { minWidth: props.menuMinWidth } : {}))
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-menu {
  max-height: 600px;
  overflow-y: auto;
  position: absolute;
  left: 50%;
  top: 120%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
