import type { GetAuthUserResponseDTO } from './auth.dto';
import type { AuthUser } from './auth.model';

export function mapGetAuthUserResponseDTO(dto: GetAuthUserResponseDTO): AuthUser {
  return {
    id: dto.id,
    email: dto.email,
    firstName: dto.first_name,
    lastName: dto.last_name,
  };
}
