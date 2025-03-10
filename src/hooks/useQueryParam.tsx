import { useSearchParams } from 'next/navigation';

const useQueryParam = (queryName: string): string => {
  const searchParams = useSearchParams();
  const queryValue = searchParams.get(queryName) || '';
  return queryValue;
};

export default useQueryParam;
