<template>
  <div class="orders-summary">
    <div>
      Всего заказов: <b>{{ ordersCount }}</b>
    </div>
    <div class="d-flex justify-content-center flex-row gap-1">
      Сумма по всем заказам: <b>{{ formattedTotalAmount }}</b>
    </div>
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
  padding: 16px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  font-weight: 400;
  align-items: center;
  justify-content: center;
}
</style>
