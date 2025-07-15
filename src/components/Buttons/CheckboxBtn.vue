<template>
  <label class="form-check form-check-label" style="cursor: pointer">
    <input
      class="form-check-input custom-checkbox"
      type="checkbox"
      :checked="checked"
      @change="onCheckHandler"
    />
    {{ label }}
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  checked: Boolean,
  id: String,
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['onCheck'])

function onCheckHandler(event: Event) {
  const target = event.target as HTMLInputElement
  emit('onCheck', target.checked)
}
</script>

<style lang="scss" scoped>
.custom-checkbox:checked {
  background-color: $color-brand !important;
  border-color: $color-brand !important;
}
.custom-checkbox:focus {
  box-shadow: none;
  border-color: $color-brand;
}
</style>
