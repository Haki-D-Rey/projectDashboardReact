export interface IGetAuthTokenUniversal {
    auth_token: string;
}

export interface IGetUniversalListContries {
    country_name: string;
    country_short_name: string;
    country_phone_code: number;
}

export interface IGetContriesUniversalListStates {
    state_name: string;
}

export interface IGetContriesUniversalListCities {
    city_name: string;
}

export interface IParamsSearch {
    name: string | null;
    typeSearch: 'cities' | 'states';
}

