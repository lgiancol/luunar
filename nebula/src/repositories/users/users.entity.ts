import { User } from '../../generated/prisma';
import { UserUncheckedCreateInput } from '../../generated/prisma/models';
import { CreateUserModel, UserModel } from '../../services/users/users.model';

export interface UserEntity extends User {}

export function mapCreateUserDataToEntity(model: CreateUserModel): UserUncheckedCreateInput {
  return {
    email: model.email,
    first_name: model.firstName,
    last_name: model.lastName,
    password: model.password,
  };
}

export function mapUserEntityToModel(entity: UserEntity): UserModel {
  return {
    id: entity.id,
    createdAt: new Date(entity.created_at),

    email: entity.email,
    firstName: entity.first_name,
    lastName: entity.last_name,
  };
}
