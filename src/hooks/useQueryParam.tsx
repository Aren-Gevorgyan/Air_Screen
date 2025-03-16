import { useSearchParams } from 'next/navigation';

const useQueryParam = (queryName: string): string | null => {
  const searchParams = useSearchParams();
  const queryValue = searchParams ? searchParams.get(queryName) : '';

  return queryValue;
};

export default useQueryParam;
