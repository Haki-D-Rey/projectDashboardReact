import { ApiUniversal } from '../index';
import { IGetContriesUniversalListCities, IGetContriesUniversalListStates, IGetUniversalListContries, IParamsSearch } from '../types/external';

const getContriesUniversal = async (): Promise<IGetUniversalListContries[]> => {
  const api = await ApiUniversal();
  const { data } = await api.get<IGetUniversalListContries[]>('/countries/');
  return data;
};

const getCitiesUniversal = async (params: IParamsSearch): Promise<IGetContriesUniversalListCities[]> => {
  const api = await ApiUniversal();
  const { data } = await api.get<IGetContriesUniversalListCities[]>(`/${params.typeSearch}/${params.name}`);
  return data;
};

const getStatesUniversal = async (params: IParamsSearch): Promise<IGetContriesUniversalListStates[]> => {
  const api = await ApiUniversal();
  const { data } = await api.get<IGetContriesUniversalListStates[]>(`/${params.typeSearch}/${params.name}`);
  return data;
};

export { getContriesUniversal, getCitiesUniversal, getStatesUniversal };
