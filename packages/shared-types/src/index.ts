export * from './events.js';

export type UserRole = 'farmer' | 'buyer' | 'agronomist' | 'admin' | 'super_admin';

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
}
