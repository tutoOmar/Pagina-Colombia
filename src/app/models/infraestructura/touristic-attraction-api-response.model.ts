import { CityMinimalApiResponse } from "./city-minimal-api-response.model";

export interface TouristAttractionApiResponse {
  id:          number;
  name:        string;
  description: string;
  images:      string[];
  latitude:    string;
  longitude:   string;
  cityId:      number;
  city:        CityMinimalApiResponse;
}