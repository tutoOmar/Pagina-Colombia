import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ColombiaMapper } from '../../mappers/colombia.mapper';
import { map, Observable, tap } from 'rxjs';
import { ColombiaApiResponse } from '../../models/infraestructura/colombia-api-response.model';
import { Colombia } from '../../models/dominio/colombia.model';

@Injectable({
  providedIn: 'root'
})
export class ColombiaDataService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Country/Colombia`;
  // Signals para guardar en Cache los datos y no tener que pedirlos varias veces
  private colombiaDataCache = signal<Colombia | null>(null);
  public colombiaData = this.colombiaDataCache.asReadonly();

  private loadingState = signal<boolean>(false);
  public isLoading = this.loadingState.asReadonly();
  /**
   * Metodo para obtener los datos de Colombia
   */
  getColombiaData():Observable<Colombia> {
    const cachedData = this.colombiaDataCache();
    if(cachedData){
      return new Observable<Colombia>(observable => {
        observable.next(cachedData);
        observable.complete();
      });
    }
    this.loadingState.set(true);
    return this.http.get<ColombiaApiResponse>(this.apiUrl)
    .pipe(
      map((response) => ColombiaMapper.toDomain(response)),
      tap((colombia:Colombia)=>{
        this.colombiaDataCache.set(colombia);
        this.loadingState.set(false);
      })
    );
  }
}
