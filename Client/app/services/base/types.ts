export type ServerResponse<T> = {
  error: string | null;
  success: boolean;
  result: T;
};
