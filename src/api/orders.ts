import { DeliveryMethod, DeliveryStatus, PaymentMethod, type Order } from '@/models/orders/order'

export class Orders {
  static async getOrders(): Promise<Order[]> {
    const orders: Order[] = [
      {
        orderNumber: '1001',
        orderDate: '2024-06-01T10:00:00Z',
        paid: true,
        client: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryDate: '2024-06-03T00:00:00Z',
        deliveryTime: '14:00-16:00',
        amount: 2500,
        deliveryStatus: DeliveryStatus.DELIVERED,
        paymentMethod: PaymentMethod.CARD,
        manager: { id: 1, name: 'Иван  Иванов ', phone: '+7 123 456-78-90', email: '' },
        deliveryMethod: DeliveryMethod.COURIER,
      },
      {
        orderNumber: '1002',
        orderDate: '2024-06-02T12:30:00Z',
        paid: false,
        client: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryDate: '2024-06-04T00:00:00Z',
        deliveryTime: '10:00-12:00',
        amount: 1800,
        deliveryStatus: DeliveryStatus.IN_PROCESS,
        paymentMethod: PaymentMethod.CARD,
        manager: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryMethod: DeliveryMethod.PICKUP,
      },
      {
        orderNumber: '1003',
        orderDate: '2024-06-03T09:15:00Z',
        paid: true,
        client: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryDate: '2024-06-05T00:00:00Z',
        deliveryTime: '18:00-20:00',
        amount: 3200,
        deliveryStatus: DeliveryStatus.IN_PATH,
        paymentMethod: PaymentMethod.CARD,
        manager: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryMethod: DeliveryMethod.COURIER,
      },
      {
        orderNumber: '1004',
        orderDate: '2024-06-04T11:45:00Z',
        paid: false,
        client: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryDate: '2024-06-06T00:00:00Z',
        deliveryTime: '16:00-18:00',
        amount: 1500,
        deliveryStatus: DeliveryStatus.COLLECTED,
        paymentMethod: PaymentMethod.CASH,
        manager: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryMethod: DeliveryMethod.PICKUP,
      },
      {
        orderNumber: '1005',
        orderDate: '2024-06-05T08:30:00Z',
        paid: true,
        client: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryDate: '2024-06-07T00:00:00Z',
        deliveryTime: '12:00-14:00',
        amount: 2700,
        deliveryStatus: DeliveryStatus.CANCELED,
        paymentMethod: PaymentMethod.CASH,
        manager: { id: 1, name: 'Иван Иванов', phone: '+7 123 456-78-90', email: '' },
        deliveryMethod: DeliveryMethod.COURIER,
      },
    ]

    return orders
  }
}
