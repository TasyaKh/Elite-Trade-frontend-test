<template>
  <div class="dropdown" ref="dropdownRef">
    <slot name="button" :toggle="toggleDropdown" />
    <transition name="dropdown-fade">
      <ul class="dropdown-menu p-3 show" v-if="isOpen" @click.stop :style="menuStyle">
        <slot name="menu" />
      </ul>
    </transition>
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
/* Animation for dropdown */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}
.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
