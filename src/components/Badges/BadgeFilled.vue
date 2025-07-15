<template>
  <span class="badge-filled">
    <slot>{{ title }}</slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped lang="scss">
.badge-filled {
  display: inline-block;
  padding: 0.25em 0.7em;
  border-radius: 6px;
  background-color: #ececec;
  font-size: 0.9rem;
}
</style>
