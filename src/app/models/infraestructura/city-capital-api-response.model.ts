export interface CityCapital {
  id:                     number;
  name:                   string;
  description:            string;
  surface:                number;
  population:             number;
  postalCode:             string;
  departmentId:           number;
  department:             null | any;
  touristAttractions:     null | any[];
  presidents:             null | any[];
  indigenousReservations: null | any[];
  airports:               null | any[];
  radios:                 null | any[];
}