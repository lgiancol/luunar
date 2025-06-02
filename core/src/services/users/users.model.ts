export interface UserModel {
  id: string;
  createdAt: Date;

  email: string;
  firstName: string;
  lastName: string;
}

export type CreateUserModel = Omit<UserModel, 'id' | 'createdAt'> & { password: string };
