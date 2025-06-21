import prisma from '../../db/prisma';
import { CreateUserModel, UserModel } from '../../services/users/users.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapCreateUserDataToEntity, mapUserEntityToModel } from './users.entity';

export async function createUser(data: CreateUserModel): Promise<Result<UserModel>> {
  try {
    const entity = await prisma.user.create({
      data: mapCreateUserDataToEntity(data),
    });

    return resultSuccess(entity, mapUserEntityToModel);
  } catch (e: any) {
    const message = e.message ?? 'Failed to create User';
    return resultError(message);
  }
}
