import { DeliveryMethod, DeliveryStatus, PaymentMethod } from '@/models/orders/order'

// Универсальная функция конвертации enum в массив опций
function enumToOptions(e: Record<string, string>) {
  return Object.entries(e).map(([key, value]) => ({
    label: value,
    value: value,
  }))
}

// Опции для фильтра Статус заказа
export const statusOptions = enumToOptions(DeliveryStatus)

// Опции для способа оплаты
export const paymentMethodOptions = enumToOptions(PaymentMethod)

// Опции для способа доставки
export const deliveryMethodOptions = enumToOptions(DeliveryMethod)
