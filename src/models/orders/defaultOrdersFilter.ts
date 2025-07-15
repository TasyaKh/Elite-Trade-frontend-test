import type { IFilterOrdersRequest } from './filterOrdersRequest'

export interface OrdersFilterOption {
  key: FilterKey
  label: string
  checked: boolean
}

export enum FilterKey {
  DeliveryStatus = 'status',
  DeliveryDate = 'deliveryDate',
  Manager = 'manager',
  OrderDate = 'orderDate',
  Paid = 'paid',
  PaymentMethod = 'paymentMethod',
  DeliveryMethod = 'deliveryMethod',
  Client = 'client',
  OrderNumber = 'orderNumber',
  PhoneNumber = 'phoneNumber',
  DeliveryTime = 'deliveryTime',
}

export const defaultOrdersFilter: OrdersFilterOption[] = [
  { key: FilterKey.DeliveryStatus, label: 'Статус оплаты', checked: false },
  {
    key: FilterKey.DeliveryDate,
    label: 'Дата доставки',
    checked: false,
  },
  { key: FilterKey.Manager, label: 'Менеджер', checked: false },
  {
    key: FilterKey.OrderDate,
    label: 'Дата оформления',
    checked: false,
  },
  { key: FilterKey.Paid, label: 'Оплачен', checked: false },
  {
    key: FilterKey.PaymentMethod,
    label: 'Способ оплаты',
    checked: false,
  },
  {
    key: FilterKey.DeliveryMethod,
    label: 'Способ получения',

    checked: false,
  },
  { key: FilterKey.Client, label: 'Клиент', checked: false },
  { key: FilterKey.OrderNumber, label: 'Номер заказа', checked: false },
  { key: FilterKey.PhoneNumber, label: 'Номер телефона', checked: false },
  {
    key: FilterKey.DeliveryTime,
    label: 'Время доставки',
    checked: false,
  },
]

export const filterKeyToPath: Record<
  FilterKey,
  keyof IFilterOrdersRequest | [keyof IFilterOrdersRequest, keyof IFilterOrdersRequest]
> = {
  [FilterKey.DeliveryStatus]: 'paymentStatus',
  [FilterKey.PaymentMethod]: 'paymentMethod',
  [FilterKey.DeliveryMethod]: 'deliveryMethod',
  [FilterKey.DeliveryDate]: ['deliveryDateFrom', 'deliveryDateTo'],
  [FilterKey.OrderDate]: ['orderDateFrom', 'orderDateTo'],
  [FilterKey.DeliveryTime]: ['deliveryTimeFrom', 'deliveryTimeTo'],
  [FilterKey.Manager]: 'manager',
  [FilterKey.Paid]: 'paid',
  [FilterKey.Client]: 'client',
  [FilterKey.OrderNumber]: 'orderNumber',
  [FilterKey.PhoneNumber]: 'phoneNumber',
}
