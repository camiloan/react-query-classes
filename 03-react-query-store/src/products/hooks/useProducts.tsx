import { useQuery } from '@tanstack/react-query';
import { productActions } from '..';

interface Options {
  filterKey?: string;
}
export const useProducts = ({ filterKey }: Options) => {
  const {
    error,
    isError,
    isFetching,
    isLoading,
    data: products = [],
  } = useQuery({
    queryKey: ['products', { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60,
  });
  return {
    error,
    isError,
    isFetching,
    isLoading,
    products,
  };
};
