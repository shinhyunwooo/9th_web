import { useQuery } from "@tanstack/react-query"

export const useCustomFetch = <T>(url: string) => {
  return useQuery({
    queryKey: [url],

    queryFn: async({signal}): Promise<T>=> {
      const response = await fetch(url, {signal});

      if(!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json() as Promise<T>;
    },
    retry: 3,
    
    retryDelay: (attemptIndex): number => {
      return Math.min(1000 * Math.pow(2, attemptIndex), 30_000);
    },

    staleTime: 5 * 60 * 1_000,

    gcTime: 10 * 60 * 1_000,
  });
};