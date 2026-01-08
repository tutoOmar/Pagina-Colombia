import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TouristAttraction } from '../../models/dominio/touristic-attraction.model';
import { TouristAttractionApiResponse } from '../../models/infraestructura/touristic-attraction-api-response.model';
import { TouristAttractionMapper } from '../../mappers/tourisitc-attraction.mapper';
@Injectable({
  providedIn: 'root'
})
export class TouristicService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/TouristicAttraction`;
  // Signals para guardar en Cache los datos lugares turisticos
  private touristAttractionDataCache = signal<TouristAttraction[] | null>(null);
  public touristAttractionData = this.touristAttractionDataCache.asReadonly();

  private loadingState = signal<boolean>(false);
  public isLoading = this.loadingState.asReadonly();
  /**
   * Metodo para obtener los datos de Lugares turisticos 
   */
  getTouristicAttractionData():Observable<TouristAttraction[]> {
    const cachedData = this.touristAttractionDataCache();
    if(cachedData){
      return new Observable<TouristAttraction[]>(observable => {
        observable.next(cachedData);
        observable.complete();
      });
    }
    this.loadingState.set(true);
    return this.http.get<TouristAttractionApiResponse[]>(this.apiUrl)
    .pipe(
      map((response) => TouristAttractionMapper.toDomain(response)),
      tap((touristAttractions:TouristAttraction[])=>{
        this.touristAttractionDataCache.set(touristAttractions);
        this.loadingState.set(false);
      })
    );
  }
}
