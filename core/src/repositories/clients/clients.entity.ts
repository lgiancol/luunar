import { Client } from '../../generated/prisma';
import { ClientUncheckedCreateInput } from '../../generated/prisma/models';
import { ClientModel, CreateClientModel } from '../../services/clients/clients.model';

export interface ClientEntity extends Client {
  income?: number;
}

export function mapCreateClientDataToEntity(model: CreateClientModel): ClientUncheckedCreateInput {
  return {
    name: model.name,
    email: model.email,
    phone: model.phone,
    notes: model.notes,
    organization_id: model.organizationId,
  };
}

export function mapClientEntityToModel(entity: ClientEntity): ClientModel {
  return {
    id: entity.id,
    createdAt: new Date(entity.created_at),

    name: entity.name,
    email: entity.email,
    phone: entity.phone,
    notes: entity.notes,
    organizationId: entity.organization_id,
    income: entity.income || 0,
  };
}
