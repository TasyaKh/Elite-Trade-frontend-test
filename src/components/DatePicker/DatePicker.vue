<template>
  <Datepicker
    :model-value="modelValue"
    :enable-time-picker="false"
    :time-picker-inline="true"
    :range="true"
    :is-24="true"
    format="dd.MM.yyyy"
    locale="ru"
    auto-apply
    placeholder="Выбрать период"
    @update:modelValue="(value: [Date | null, Date | null]) => $emit('update:modelValue', value)"
  />
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

defineProps<{
  modelValue: Date[] | null
}>()

defineEmits<{
  (e: 'update:modelValue', value: [Date | null, Date | null]): void
}>()
</script>

<style scoped lang="scss">
:deep(.dp__theme_light) {
  --dp-primary-color: var(--color-brand, #007bff);
}
</style>
