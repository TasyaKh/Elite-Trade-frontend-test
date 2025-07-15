<template>
  <div>
    <CheckboxBtn
      v-for="option in options"
      :key="option.value"
      :checked="modelValue.includes(option.value)"
      :label="option.label"
      :id="option.value"
      @onCheck="onToggle(option.value)"
    />
  </div>
</template>

<script setup lang="ts">
import CheckboxBtn from './CheckboxBtn.vue'

const props = defineProps<{
  options: { label: string; value: string }[]
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

function onToggle(value: string) {
  const selected = new Set([...props.modelValue])
  if (selected.has(value)) {
    selected.delete(value)
  } else {
    selected.add(value)
  }
  emit('update:modelValue', [...selected])
}
</script>
