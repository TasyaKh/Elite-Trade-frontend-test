<template>
  <div class="text-secondary fw-medium mb-3">Фильтры</div>
  <div class="d-flex flex-column gap-2 mb-4">
    <CheckboxBtn
      v-for="filter in localFilters"
      :key="filter.key"
      :label="filter.label"
      :checked="filter.checked"
      @onCheck="onCheckFilter(filter.key, $event)"
    />
  </div>
  <button class="custom-btn-primary w-100 fw-semibold py-2 rounded-3" @click="onApplyFilters">
    Применить
  </button>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import type { OrdersFilterOption } from '@/models/orders/defaultOrdersFilter'
import CheckboxBtn from '../Buttons/CheckboxBtn.vue'

const props = defineProps<{ filters: OrdersFilterOption[] }>()
const emit = defineEmits<{
  (e: 'addFilters', filters: OrdersFilterOption[]): void
}>()

// копия фильтров
const localFilters = ref<OrdersFilterOption[]>([...props.filters])

// обновляем локальные фильтры
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = [...newFilters]
  },
  { immediate: true, deep: true },
)

function onCheckFilter(key: string, checked: boolean) {
  localFilters.value = localFilters.value.map((filter) =>
    filter.key === key ? { ...filter, checked } : filter,
  )
}

function onApplyFilters() {
  emit(
    'addFilters',
    localFilters.value.filter((f) => f.checked),
  )
}
</script>
