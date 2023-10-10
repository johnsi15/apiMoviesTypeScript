import type { User } from '../../types'
export class UsersServiceMock {
  async getUser (email: string = 'test@email.com'): Promise<User> {
    // Devuelve datos de usuario ficticios para pruebas
    return {
      _id: '1',
      name: 'test',
      email,
      password: 'XXXX'
    }
  }
}
