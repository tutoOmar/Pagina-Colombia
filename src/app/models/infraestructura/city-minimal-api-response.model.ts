export interface CityMinimalApiResponse {
  id:                     number;
  name:                   string;
  description:            string;
  surface:                number | null;
  population:             number | null;
  postalCode:             string | null;
  departmentId:           number;
  department:             null;
  touristAttractions:     any[] | null;
  presidents:             null;
  indigenousReservations: null;
  airports:               null;
  radios:                 null;
}