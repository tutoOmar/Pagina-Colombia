import { CityCapitalApiResponse } from "./city-capital-api-response.model";
import { ColombiaApiResponse } from "./colombia-api-response.model";

export interface DepartmentApiResponse {
  id:                     number;
  name:                   string;
  description:            string;
  cityCapitalId:          number;
  municipalities:         number;
  surface:                number;
  population:             number;
  phonePrefix:            string;
  countryId:              number;
  cityCapital:            CityCapitalApiResponse;
  country:                ColombiaApiResponse;
  cities:                 null | any[];
  regionId:               number;
  region:                 null | any;
  naturalAreas:           null | any[];
  maps:                   null | any[];
  indigenousReservations: null | any[];
  airports:               null | any[];
}