<template>
  <div class="container py-4">
    <!-- modal filters -->
    <ModalMinimal title="Фильтры" v-model:isOpen="isModalOpen">
      <template #button="{ toggle }">
        <button class="custom-btn-primary outlined small" @click="toggle">
          <FontAwesomeIcon :icon="faFilter" /> Фильтры
        </button>
      </template>
      <OrdersFilter
        v-if="Object.keys(activeFilters).length > 0"
        v-model="filterOrdersRequest"
        :activeFilters="activeFilters"
        @applyFilters="handleApplyFilters"
        @resetFilters="handleResetFilters"
      />
      <div v-else class="alert alert-warning">Фильтры не заданы</div>
    </ModalMinimal>

    <div class="d-flex flex-wrap my-4 gap-2">
      <!-- applied filter badges -->
      <BadgeFilled v-for="(label, key) in activeFilters" :key="key" :title="label" />

      <!-- filters list -->
      <DropdownMenuTemplate :menuMinWidth="'200px'">
        <template #button="{ toggle }">
          <button class="custom-btn-secondary outlined small" @click="toggle">
            <span> Добавить фильтры + </span>
          </button>
        </template>
        <template #menu>
          <OrdersFiltersList :filters="filters" @addFilters="addActiveFilters" />
        </template>
      </DropdownMenuTemplate>
    </div>
    <OrdersTable :orders="orders" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import OrdersFiltersList from '@/components/OrdersFilters/OrdersFiltersList.vue'
import {
  defaultOrdersFilter,
  FilterKey,
  filterKeyToPath,
  type OrdersFilterOption,
} from '@/models/orders/defaultOrdersFilter'
import DropdownMenuTemplate from '@/components/Dropdowns/DropdownMenuTemplate.vue'
import {
  getDefaultFilterOrdersRequest,
  type IFilterOrdersRequest,
} from '@/models/orders/filterOrdersRequest'
import { type Order } from '@/models/orders/order'
import OrdersFilter from '@/components/OrdersFilters/OrdersFilter.vue'
import ModalMinimal from '@/components/Modals/ModalMinimal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { normalizeQueryObject } from '@/utils/query/normalizeQueryObject'
import { isTime } from '@/models/other/time'
import OrdersTable from './OrdersTable.vue'
import BadgeFilled from '@/components/Badges/BadgeFilled.vue'
import { Orders } from '@/api/orders'

const isModalOpen = ref(false)

export type ActiveFilters = Partial<Record<FilterKey, string>>

const orders = ref<Order[]>([])
const filters = ref<OrdersFilterOption[]>([...defaultOrdersFilter])
const activeFilters = ref<ActiveFilters>({})

const filterOrdersRequest = ref<IFilterOrdersRequest>(getDefaultFilterOrdersRequest())

onMounted(async () => {
  orders.value = await Orders.getOrders()
})

function addActiveFilters(selected: OrdersFilterOption[]) {
  filters.value = filters.value.map((f) => {
    const isSelected = selected.some((s) => s.key === f.key)
    if (isSelected) activeFilters.value[f.key] = f.label
    else delete activeFilters.value[f.key]
    return { ...f, checked: isSelected }
  })

  handleApplyFilters()
}

function formatValue(value: unknown): string | unknown {
  if (value instanceof Date) {
    const formatString = 'dd.MM.yyyy'
    return format(value, formatString)
  } else if (isTime(value)) {
    return `${value.hours}:${value.minutes}`
  }

  return value
}

function getAppliedFilterQueryObject(): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  Object.entries(activeFilters.value).forEach(([filterKey]) => {
    const key = filterKey as FilterKey
    const path = filterKeyToPath[key]

    if (Array.isArray(path)) {
      path.forEach((p) => {
        result[p] = formatValue(filterOrdersRequest.value[p])
      })
    } else {
      result[path] = formatValue(filterOrdersRequest.value[path])
    }
  })

  return result
}

const handleApplyFilters = () => {
  const rawQuery = getAppliedFilterQueryObject()
  const queryString = normalizeQueryObject(rawQuery)
  const url = `${window.location.pathname}?${queryString}`
  window.history.replaceState({}, '', url)
  isModalOpen.value = false
}

const handleResetFilters = () => {
  filterOrdersRequest.value = getDefaultFilterOrdersRequest()
}
</script>

<style scoped lang="scss"></style>
