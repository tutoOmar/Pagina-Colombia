import { TouristAttraction } from "../models/dominio/touristic-attraction.model";
import { TouristAttractionApiResponse } from "../models/infraestructura/touristic-attraction-api-response.model";

export class TouristAttractionMapper {
  static toDomain(raw: TouristAttractionApiResponse[]): TouristAttraction[] {
    return raw.map(item => {
        const { id, name, description, images, cityId } = item;
        return {
        id,
        name,
        description,
        images: images ?? [],
        cityId
        };
    })
  }
  /**
   * Obtenemos la lista de todos los lugares turisticos
   */
  static toDomainList(list: TouristAttractionApiResponse[]): TouristAttraction[] {
    return this.toDomain(list);
  }
}