import { inject, Injectable, signal } from '@angular/core';
import { CityMinimalApiResponse } from '../../models/infraestructura/city-minimal-api-response.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CityService {

    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/city`;
    // Signals para guardar en Cache los datos lugares turisticos
    private citiesDataCache = signal<CityMinimalApiResponse[] | null>(null);
    public citiesData = this.citiesDataCache.asReadonly();
  
    private loadingState = signal<boolean>(false);
    public isLoading = this.loadingState.asReadonly();
    /**
     * Metodo para obtener los datos de Ciudades 
     */
    getCitiesData():Observable<CityMinimalApiResponse[]> {
      const cachedData = this.citiesDataCache();
      if(cachedData){
        return new Observable<CityMinimalApiResponse[]>(observable => {
          observable.next(cachedData);
          observable.complete();
        });
      }
      this.loadingState.set(true);
      return this.http.get<CityMinimalApiResponse[]>(this.apiUrl)
      .pipe(
        tap((cities:CityMinimalApiResponse[])=>{
          this.citiesDataCache.set(cities);
          this.loadingState.set(false);
        })
      );
    }
    /**
     * Obtiene una ciudad por su ID
     * @param id 
     * @returns 
     */
    getCityById(id:string):Observable<CityMinimalApiResponse | null>{ 
      return this.http.get<CityMinimalApiResponse>(`${this.apiUrl}/${id}`);
    }
}
