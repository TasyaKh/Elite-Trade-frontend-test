import type { IUser } from '@/models/user'

export class Users {
  static async getUsers(): Promise<IUser[]> {
    const data: IUser[] = [
      { id: 1, name: 'Manager 1', email: '', phone: '' },
      { id: 2, name: 'Manager 2', email: '', phone: '' },
      { id: 3, name: 'Manager 3', email: '', phone: '' },
      { id: 4, name: 'Manager 4', email: '', phone: '' },
      { id: 5, name: 'Manager 5', email: '', phone: '' },
    ]
    return data
  }
}
