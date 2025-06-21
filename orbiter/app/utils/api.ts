// src/utils/api.ts
import { type Result } from '~/types/result';
import { API_BASE_URL } from '../config/api';

export type ResponseMapper<RESPONSE, MODEL> = (data: RESPONSE) => MODEL;

export const mapBooleanResponseDTO = (dto: boolean) => dto;

export function ok<RESPONSE, MODEL>(data: RESPONSE, mapper: ResponseMapper<RESPONSE, MODEL>): Result<MODEL> {
  return { success: true, data: mapper(data) };
}

export function err<T = never>(error: string): Result<T> {
  return { success: false, error };
}

export async function apiPost<RESPONSE, MODEL>(
  endpoint: string,
  payload: any,
  mapper: ResponseMapper<RESPONSE, MODEL>
): Promise<Result<MODEL>> {
  console.log('API_BASE_URL', API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error: ${res.status} ${error}`);
  }

  const data = (await res.json()) as RESPONSE;

  return ok(data, mapper);
}

export async function apiGet<RESPONSE, MODEL>(
  endpoint: string,
  mapper: (data: RESPONSE) => MODEL
): Promise<Result<MODEL>> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error: ${res.status} ${error}`);
  }

  const data = (await res.json()) as RESPONSE;

  return ok(data, mapper);
}
