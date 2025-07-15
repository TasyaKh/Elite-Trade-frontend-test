<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  isOpen?: boolean
}>()

const isOpen = ref(props.isOpen)
function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="collapsible-list">
    <div class="collapsible-header" @click="toggle">
      <span>{{ title }}</span>
      <FontAwesomeIcon :icon="isOpen ? faChevronUp : faChevronDown" />
    </div>
    <div v-show="isOpen" class="collapsible-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.collapsible-list {
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 8px;
  background: #fff;
}
.collapsible-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 12px 16px;
  font-weight: 500;
  user-select: none;
}
.collapsible-body {
  padding: 12px 16px;
  border-top: 1px solid #eee;
}
</style>
