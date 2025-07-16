<template>
  <div class="table-responsive rounded border">
    <table class="table w-100 m-0">
      <thead class="table-light">
        <tr>
          <th scope="col">№ заказа</th>
          <th scope="col">Дата заказа</th>
          <th scope="col">Оплачен</th>
          <th scope="col">Клиент</th>
          <th scope="col">Дата доставки</th>
          <th scope="col">Время доставки</th>
          <th scope="col">Сумма</th>
          <th scope="col ">Статус</th>
          <th scope="col">Способ оплаты</th>
          <th scope="col">Менеджер</th>
          <th scope="col">Способ доставки</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in props.orders" :key="order.orderNumber">
          <!-- order number -->
          <td>{{ order.orderNumber }}</td>
          <!-- order date -->
          <td>{{ formatDate(order.orderDate) }}</td>
          <!-- paid -->
          <td class="text-center">
            <FontAwesomeIcon v-if="order.paid" :icon="faCircleCheck" class="text-success" />
            <FontAwesomeIcon v-else :icon="faCircleXmark" class="text-danger" />
          </td>
          <!-- client -->
          <td>
            <RouterLink :to="`/users/${order.client.id}`">
              {{ order.client.name }}
            </RouterLink>
          </td>
          <!-- delivery date -->
          <td>{{ formatDate(order.deliveryDate) }}</td>
          <!-- delivery time -->
          <td>{{ order.deliveryTime }}</td>
          <!-- amount -->
          <td>
            {{ order.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) }}
          </td>
          <!-- delivery status -->
          <td>
            <OutlinedBadge :type="paymentStatusBadgeType(order.deliveryStatus)">
              {{ order.deliveryStatus }}
            </OutlinedBadge>
          </td>
          <!-- payment method -->
          <td>
            <OutlinedBadge :type="paymentMethodBadgeType(order.paymentMethod)">
              {{ order.paymentMethod }}
            </OutlinedBadge>
          </td>
          <!-- manager name -->
          <td>
            <RouterLink v-if="order.manager" :to="`/users/${order.manager.id}`">
              {{ order.manager.name }}
            </RouterLink>
            <div v-else>-</div>
          </td>
          <!-- delivery method -->
          <td>
            <OutlinedBadge :type="deliveryMethodBadgeType(order.deliveryMethod)">
              {{ order.deliveryMethod }}
            </OutlinedBadge>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import OutlinedBadge from '@/components/Badges/OutlinedBadge.vue'
import type { IOrder } from '@/models/orders/order'
import { DeliveryStatus, PaymentMethod, DeliveryMethod } from '@/models/orders/order'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { format } from 'date-fns'

const props = defineProps<{
  orders: IOrder[]
}>()

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return format(d, 'dd.MM.yyyy')
}

function paymentStatusBadgeType(status: DeliveryStatus) {
  switch (status) {
    case DeliveryStatus.CANCELED:
      return 'danger'
    case DeliveryStatus.IN_PROCESS:
      return 'info'
    case DeliveryStatus.COLLECTED:
      return 'primary'
    case DeliveryStatus.IN_PATH:
      return 'warning'
    case DeliveryStatus.DELIVERED:
      return 'success'
    default:
      return 'secondary'
  }
}

function paymentMethodBadgeType(method: PaymentMethod) {
  switch (method) {
    case PaymentMethod.CASH:
      return 'secondary'
    case PaymentMethod.CARD:
      return 'primary'
    default:
      return 'secondary'
  }
}

function deliveryMethodBadgeType(method: DeliveryMethod) {
  switch (method) {
    case DeliveryMethod.PICKUP:
      return 'info'
    case DeliveryMethod.COURIER:
      return 'success'
    default:
      return 'secondary'
  }
}
</script>

<style scoped lang="scss">
thead {
  th {
    background-color: rgba($color-brand, 0.7);
    color: white;
  }
}

th,
td {
  width: auto;
  white-space: nowrap;
  text-align: left;
}

th {
  font-weight: 400;
}
td {
  font-weight: 300;
}
</style>
