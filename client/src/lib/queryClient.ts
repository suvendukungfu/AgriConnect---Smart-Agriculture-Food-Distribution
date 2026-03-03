import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,                 // Retry failed requests 3 times (offline tolerance)
      refetchOnWindowFocus: false, // Critical: don't burn data when swapping apps on mobile
    },
  },
});
