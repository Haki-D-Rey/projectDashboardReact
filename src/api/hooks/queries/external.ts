import { getCitiesUniversal, getContriesUniversal } from '@/api/endpoints/external';
import { IGetContriesUniversalListCities, IGetUniversalListContries, IParamsSearch } from '@/api/types/external';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const useQueryGetContriesUniversal = (): UseQueryResult<IGetUniversalListContries[]> => {
  const data = useQuery<IGetUniversalListContries[]>(['get-authtoken-Universal'], async () => {
    return await getContriesUniversal();
  });
  return data;
};

const useQueryGetUniversalCities = (
  params: IParamsSearch
): UseQueryResult<IGetContriesUniversalListCities[]> => {
  const data = useQuery<IGetContriesUniversalListCities[] >(
    ['get-authtoken-Universal', params],
    async () => {
      return await getCitiesUniversal(params);
    },
    {
      enabled: !!params.name,
    }
  );
  return data;
};

export { useQueryGetContriesUniversal, useQueryGetUniversalCities };
