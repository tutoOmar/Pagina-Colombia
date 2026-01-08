import { Colombia } from "../models/dominio/colombia.model";
import { ColombiaApiResponse } from "../models/infraestructura/colombia-api-response.model";

export class ColombiaMapper {
  static toDomain(apiResponse: ColombiaApiResponse): Colombia {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      description: apiResponse.description,
      capital: apiResponse.stateCapital,
      surface: apiResponse.surface,
      population: apiResponse.population,
      languages: apiResponse.languages,
      timeZone: apiResponse.timeZone,
      currency: apiResponse.currency,
      currencyCode: apiResponse.currencyCode,
      currencySymbol: apiResponse.currencySymbol,
      region: apiResponse.region,
      borders: apiResponse.borders,
      flags: apiResponse.flags
    };
  }
  /**
   * Formatea la población con separadores de miles
   */
  static formatPopulation(population: number): string {
    return population.toLocaleString('es-CO');
  }
  /**
   * Formatea la superficie con unidades
   */
  static formatSurface(surface: number): string {
    return `${surface.toLocaleString('es-CO')} km²`;
  }
  /**
   * Traduce los nombres de los idiomas al español
   */
  static translateLanguages(languages: string[]): string[] {
    const translations: { [key: string]: string } ={
      'Spanish': 'Español',
      'English': 'Inglés',
    }
    return languages.map(lang => translations[lang] || lang);
  }
}