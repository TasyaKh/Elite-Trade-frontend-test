<template>
  <div class="orders-summary">
    <span>
      Всего заказов: <b>{{ ordersCount }}</b>
    </span>
    <span class="ms-4">
      Сумма по всем заказам: <b>{{ formattedTotalAmount }}</b>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const ordersCount = ref(123)
const totalAmount = ref(3434545)

const formattedTotalAmount = computed(() =>
  totalAmount.value.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }),
)
</script>

<style scoped lang="scss">
.orders-summary {
  font-size: 1.1rem;
  border-radius: 8px;
  background: #f8f9fa;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  padding: 16px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  font-weight: 400;
  align-items: center;
  justify-content: center;
}
.orders-summary span {
  white-space: pre-line;
}
</style>
