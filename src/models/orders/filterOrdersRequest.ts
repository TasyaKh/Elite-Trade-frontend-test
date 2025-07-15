import type { Time } from '../other/time'
import { DeliveryMethod, DeliveryStatus, PaymentMethod } from './order'

export interface IFilterOrdersRequest {
  paymentStatus?: DeliveryStatus[]
  // delivery date
  deliveryDateFrom?: Date | null
  deliveryDateTo?: Date | null
  // delivery time
  deliveryTimeFrom?: Time | null
  deliveryTimeTo?: Time | null
  manager?: number | null
  // order date
  orderDateFrom?: Date | null
  orderDateTo?: Date | null
  paid?: boolean
  paymentMethod?: PaymentMethod[]
  deliveryMethod?: DeliveryMethod[]
  client?: string
  orderNumber?: string
  phoneNumber?: string
}

export function getDefaultFilterOrdersRequest(): IFilterOrdersRequest {
  return {
    paymentStatus: [
      DeliveryStatus.CANCELED,
      DeliveryStatus.DELIVERED,
      DeliveryStatus.IN_PROCESS,
      DeliveryStatus.IN_PATH,
      DeliveryStatus.COLLECTED,
    ],
    paymentMethod: [PaymentMethod.CARD, PaymentMethod.CASH],
    deliveryMethod: [DeliveryMethod.COURIER, DeliveryMethod.PICKUP],
    orderDateFrom: new Date(),
    orderDateTo: new Date(),
    deliveryDateFrom: new Date(),
    deliveryDateTo: new Date(),
    deliveryTimeFrom: { hours: 0, minutes: 0, seconds: 0 },
    deliveryTimeTo: { hours: 23, minutes: 59, seconds: 0 },
    orderNumber: '',
    phoneNumber: '',
    client: '',
    manager: null,
    paid: true,
  }
}
