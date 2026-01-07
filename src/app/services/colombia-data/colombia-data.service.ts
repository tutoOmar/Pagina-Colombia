import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ColombiaMapper } from '../../mappers/colombia.mapper';
import { map, Observable } from 'rxjs';
import { ColombiaApiResponse } from '../../models/infraestructura/colombia-api-response.model';
import { Colombia } from '../../models/dominio/colombia.model';

@Injectable({
  providedIn: 'root'
})
export class ColombiaDataService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Country/Colombia`;
  /**
   * Metodo para obtener los datos de Colombia
   */
  getColombiaData():Observable<Colombia> {
    return this.http.get<ColombiaApiResponse>(this.apiUrl)
    .pipe(
      map((response) => ColombiaMapper.toDomain(response))
    );
  }
}
