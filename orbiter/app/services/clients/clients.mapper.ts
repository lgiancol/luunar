import type { GetClientResponseDTO } from './clients.dto';
import type { Client } from './clients.model';

export function mapGetClientResponseDTO(dto: GetClientResponseDTO): Client {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at),

    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    notes: dto.notes,
    organizationId: dto.organization_id,
    income: dto.income,
  };
}
