import type { IUser } from '../user'

export enum DeliveryStatus {
  CANCELED = 'Отменен',
  IN_PROCESS = 'В обработке',
  COLLECTED = 'Собран',
  IN_PATH = 'В пути',
  DELIVERED = 'Доставлен',
}

export enum PaymentMethod {
  CASH = 'Наличные',
  CARD = 'Карта',
}

export enum DeliveryMethod {
  PICKUP = 'Самовывоз',
  COURIER = 'Курьерская доставка',
}

export interface Order {
  orderNumber: string
  orderDate: string // ISO date string
  paid: boolean
  client: IUser
  deliveryDate: string // ISO date string
  deliveryTime: string // e.g., '13:00 — 15:00'
  amount: number
  deliveryStatus: DeliveryStatus
  paymentMethod: PaymentMethod
  manager: IUser
  deliveryMethod: DeliveryMethod
}
