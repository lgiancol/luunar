export type Result<T> = { success: true; data: T } | { success: false; error: string };

export function isResultSuccess<T>(res: Result<T>): res is { success: true; data: T } {
  return res.success;
}

export function isResultError<T>(res: Result<T>): res is { success: false; error: string } {
  return !res.success;
}
