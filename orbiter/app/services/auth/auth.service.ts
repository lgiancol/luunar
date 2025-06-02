import type { Result } from '~/types/result';
import { apiPost, mapBooleanResponseDTO } from '../../utils/api';
import type { GetAuthUserResponseDTO, LoginPayloadDTO, RegisterPayloadDTO } from './auth.dto';
import { mapGetAuthUserResponseDTO } from './auth.mapper';
import type { AuthUser } from './auth.model';

export async function registerUser(payload: RegisterPayloadDTO): Promise<Result<AuthUser>> {
  return apiPost<GetAuthUserResponseDTO, AuthUser>('/auth/register', payload, mapGetAuthUserResponseDTO);
}

export async function loginUser(payload: LoginPayloadDTO): Promise<Result<AuthUser>> {
  return apiPost<GetAuthUserResponseDTO, AuthUser>('/auth/login', payload, mapGetAuthUserResponseDTO);
}

export async function logoutUser(): Promise<Result<boolean>> {
  return apiPost<boolean, boolean>('/auth/logout', undefined, mapBooleanResponseDTO);
}

export async function validateUser() {
  return apiPost<GetAuthUserResponseDTO, AuthUser>('/auth/validate', undefined, mapGetAuthUserResponseDTO);
}
