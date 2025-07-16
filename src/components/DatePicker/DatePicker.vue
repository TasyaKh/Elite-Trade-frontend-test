<template>
  <Datepicker
    v-model="model"
    :enable-time-picker="false"
    :time-picker-inline="true"
    :range="true"
    :is-24="true"
    format="dd.MM.yyyy"
    locale="ru"
    auto-apply
    placeholder="Выбрать период"
  />
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const model = defineModel<Date[]>()
</script>

<style scoped lang="scss">
:deep(.dp__theme_light) {
  --dp-primary-color: var(--color-brand, #007bff);
}
</style>
