<template>
  <div class="d-flex gap-2 align-items-center">
    <Datepicker
      :range="true"
      :model-value="modelValue"
      :cancel-text="'Отмена'"
      :select-text="'Выбрать'"
      time-picker
      placeholder="Выберать время"
      locale="ru"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Time } from '@/models/other/time'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

defineProps<{
  modelValue: Time[] | null
}>()

defineEmits<{
  (e: 'update:modelValue', value: [Time | null, Time | null]): void
}>()
</script>

<style scoped lang="scss">
:deep(.dp__theme_light) {
  --dp-primary-color: var(--color-brand, #007bff);
}
</style>
