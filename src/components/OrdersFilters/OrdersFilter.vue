<template>
  <div class="d-flex flex-column gap-2">
    <!-- delivery status  -->
    <CollapsibleList v-if="FilterKey.DeliveryStatus in activeFilters" title="Статус" :isOpen="true">
      <MultiSelectCheckbox
        :options="statusOptions"
        :modelValue="filters.paymentStatus || []"
        @update:modelValue="onUpdatePaymentStatus"
      />
    </CollapsibleList>

    <!-- payment method  -->
    <CollapsibleList
      v-if="FilterKey.PaymentMethod in activeFilters"
      title="Метод оплаты"
      :isOpen="true"
    >
      <MultiSelectCheckbox
        :options="paymentMethodOptions"
        :modelValue="filters.paymentMethod || []"
        @update:modelValue="onUpdatePaymentMethod"
      />
    </CollapsibleList>

    <!-- delivery method  -->
    <CollapsibleList
      v-if="FilterKey.DeliveryMethod in activeFilters"
      title="Метод доставки"
      :isOpen="true"
    >
      <MultiSelectCheckbox
        :options="deliveryMethodOptions"
        :modelValue="filters.deliveryMethod || []"
        @update:modelValue="onUpdateDeliveryMethod"
      />
    </CollapsibleList>

    <!-- delivery date  -->
    <template
      v-if="
        FilterKey.DeliveryDate in activeFilters &&
        filters.deliveryDateFrom &&
        filters.deliveryDateTo
      "
    >
      <h6>Дата доставки</h6>
      <DatePicker
        :modelValue="[filters.deliveryDateFrom, filters.deliveryDateTo]"
        @update:modelValue="onDeliveryDateRangeChange"
      />
    </template>

    <!-- order date -->
    <template
      v-if="FilterKey.OrderDate in activeFilters && filters.orderDateFrom && filters.orderDateTo"
    >
      <h6>Дата заказа</h6>
      <DatePicker
        :model-value="[filters.orderDateFrom, filters.orderDateTo]"
        @update:modelValue="onOrderDateRangeChange"
      />
    </template>

    <!-- order date -->
    <template
      v-if="
        FilterKey.DeliveryTime in activeFilters &&
        filters.deliveryTimeFrom &&
        filters.deliveryTimeTo
      "
    >
      <h6>Время доставки</h6>
      <TimePicker
        :model-value="[filters.deliveryTimeFrom, filters.deliveryTimeTo]"
        @update:modelValue="onDeliveryTimeRangeChange"
      />
    </template>

    <!-- paid -->
    <template v-if="FilterKey.Paid in activeFilters">
      <h6>Оплачено</h6>
      <RadioBtnsGroup
        :selectedValue="filters.paid ? 'true' : 'false'"
        @update="(val) => (filters.paid = val === 'true')"
        :options="[
          { value: 'true', label: 'Да' },
          { value: 'false', label: 'Нет' },
        ]"
        name="paid"
      />
    </template>

    <!-- manager  -->
    <template v-if="FilterKey.Manager in activeFilters">
      <h6>Менеджер</h6>
      <SelectSingle
        :items="getManagersOptions()"
        keyProp="id"
        valueProp="name"
        :modelValue="filters.manager ?? null"
        @update:modelValue="(newValue) => (filters.manager = Number(newValue))"
      />
    </template>

    <!-- client search -->
    <template v-if="FilterKey.Client in activeFilters">
      <h6>Поиск по клиенту</h6>
      <TextInput v-model="filters.client" placeholder="Поиск..." :type="TextInputType.TEXT" />
    </template>

    <!-- order number -->
    <template v-if="FilterKey.OrderNumber in activeFilters">
      <h6>Номер заказа</h6>
      <TextInput v-model="filters.orderNumber" placeholder="Поиск..." :type="TextInputType.TEXT" />
    </template>

    <!-- phone number -->
    <template v-if="FilterKey.PhoneNumber in activeFilters">
      <h6>Номер телефона</h6>
      <TextInput v-model="filters.phoneNumber" placeholder="Поиск..." :type="TextInputType.PHONE" />
    </template>

    <div class="filter-actions-sticky d-flex flex-wrap justify-content-between gap-4">
      <button class="custom-btn-primary" @click="onApplyFilters">Применить</button>
      <button class="custom-btn-secondary outlined" @click="onResetFilters">Сбросить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MultiSelectCheckbox from '@/components/Buttons/MultiSelectCheckbox.vue'
import {
  deliveryMethodOptions,
  paymentMethodOptions,
  statusOptions,
} from '@/utils/orderFilters/orderSelectOptions'
import CollapsibleList from '../CollapsibleList.vue'
import DatePicker from '../DatePicker/DatePicker.vue'
import RadioBtnsGroup from '../Buttons/RadioBtnsGroup.vue'
import TextInput from '../TextInput.vue'
import TimePicker from '../DatePicker/TimePicker.vue'
import { type IFilterOrdersRequest } from '@/models/orders/filterOrdersRequest'
import { FilterKey } from '@/models/orders/defaultOrdersFilter'
import type { ActiveFilters } from '@/pages/OrdersPage/OrdersPage.vue'
import type { DeliveryMethod, PaymentMethod, DeliveryStatus } from '@/models/orders/order'
import { onMounted, ref } from 'vue'
import SelectSingle from '../Selectors/SelectSingle.vue'
import type { Time } from '@/models/other/time'
import { Users } from '@/api/users'
import { TextInputType } from '@/utils/enums/TextInputType'
import type { IUser } from '@/models/user'

const props = defineProps<{
  activeFilters: ActiveFilters
}>()

const managers = ref<IUser[]>([])

const emit = defineEmits<{
  (e: 'applyFilters', filters: IFilterOrdersRequest): void
  (e: 'resetFilters'): void
}>()

const filters = defineModel<IFilterOrdersRequest>({ default: () => ({}) })

const onApplyFilters = () => {
  emit('applyFilters', filters.value)
}
const onResetFilters = () => {
  emit('resetFilters')
}

onMounted(async () => {
  if (FilterKey.Manager in props.activeFilters) {
    managers.value = await Users.getUsers()
  }
})

function onDeliveryDateRangeChange(val: Date[]) {
  filters.value.deliveryDateFrom = val[0]
  filters.value.deliveryDateTo = val[1]
}

function onOrderDateRangeChange(val: Date[]) {
  filters.value.orderDateFrom = val[0]
  filters.value.orderDateTo = val[1]
}

function onDeliveryTimeRangeChange(val: Time[]) {
  filters.value.deliveryTimeFrom = val[0]
  filters.value.deliveryTimeTo = val[1]
}

const onUpdatePaymentStatus = (values: string[]) => {
  filters.value.paymentStatus = values as DeliveryStatus[]
}

const onUpdatePaymentMethod = (values: string[]) => {
  filters.value.paymentMethod = values as PaymentMethod[]
}

const onUpdateDeliveryMethod = (values: string[]) => {
  filters.value.deliveryMethod = values as DeliveryMethod[]
}

const getManagersOptions = () => {
  const managersOptions: { id: number; name: string }[] = []
  managersOptions.push({ id: 0, name: 'Не задан' })
  managers.value.forEach((manager) => {
    managersOptions.push({ id: manager.id, name: manager.name })
  })
  return managersOptions
}
</script>

<style scoped>
.filter-actions-sticky {
  position: sticky;
  bottom: 0;
  left: 0;
  background: #fff;
  padding: 16px 0 8px 0;
  z-index: 10;
}
</style>
