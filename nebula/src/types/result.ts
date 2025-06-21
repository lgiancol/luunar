export type Result<T> = { success: true; data: T } | { success: false; error: string };

export type ResponseMapper<D, M> = (data: D) => M;

export function resultSuccess<D, M>(data: D, mapper: ResponseMapper<D, M>): Result<M> {
  return { success: true, data: mapper(data) };
}

export function resultError<T = never>(error: string): Result<T> {
  return { success: false, error };
}

export function isResultSucces<T>(res: Result<T>): res is { success: true; data: T } {
  return res.success;
}

export function isResultError<T>(res: Result<T>): res is { success: false; error: string } {
  return !res.success;
}
