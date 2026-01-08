import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ColombiaDataService } from './colombia-data.service';
import { environment } from '../../../environments/environment.development';
import { ColombiaApiResponse } from '../../models/infraestructura/colombia-api-response.model';
import { Colombia } from '../../models/dominio/colombia.model';

describe('ColombiaDataService', () => {
  let service: ColombiaDataService;
  let httpMock: HttpTestingController;

  // 1. DATOS DE PRUEBA (MOCKS)
  const mockApiResponse: ColombiaApiResponse = {
    id: 1,
    name: 'Colombia',
    description: 'País hermoso',
    stateCapital: 'Bogotá',
    surface: 1141748,
    population: 50000000,
    languages: ['Español'],
    timeZone: 'UTC-5',
    currency: 'COP',
    currencyCode: 'COP',
    isoCode: 'CO',
    internetDomain: '.co',
    phonePrefix: '+57',
    radioPrefix: 'HJ',
    aircraftPrefix: 'HK',
    subRegion: 'South America',
    region: 'Americas',
    borders: ['Venezuela'],
    flags: ['url_flag'],
    currencySymbol: ''
  };

  // Simulamos lo que esperamos que devuelva el servicio (Modelo de Dominio)
  // Asumimos que el Mapper transforma los nombres de las propiedades si es necesario.
  // Si tu mapper hace cambios drásticos, ajusta este objeto.
  const expectedDomainData: Colombia = {
    id: 1,
    name: 'Colombia',
    description: 'País hermoso',
    surface: 1141748,
    population: 50000000,
    languages: ['Español'],
    timeZone: 'UTC-5',
    currency: 'COP',
    currencyCode: 'COP',
    region: 'Americas',
    borders: ['Venezuela'],
    flags: ['url_flag'],
    capital: '',
    currencySymbol: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ColombiaDataService,
        // Nuevas funciones para testing HTTP en Angular 16+
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ColombiaDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones pendientes después de cada test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // === TEST 1: Petición HTTP (Sin caché) ===
  it('should fetch data from API and update signals if cache is empty', () => {
    
    // 1. Llamamos al método
    service.getColombiaData().subscribe((data) => {
      // 3. Verificamos que los datos retornados sean los esperados
      expect(data).toEqual(expectedDomainData);
      
      // 4. Verificamos que la Signal se haya actualizado (Caché guardada)
      expect(service.colombiaData()).toEqual(expectedDomainData);
      
      // 5. Verificamos que el loading haya terminado
      expect(service.isLoading()).toBeFalse();
    });

    // 2. Interceptamos la petición HTTP
    const req = httpMock.expectOne(`${environment.apiUrl}/Country/Colombia`);
    expect(req.request.method).toBe('GET');

    // Simulamos que el servidor responde con los datos mock
    req.flush(mockApiResponse);
  });

  // === TEST 2: Uso de Caché ===
  it('should return cached data and NOT call API if data exists', () => {
    // PASO 1: Llenar la caché (haciendo una primera llamada)
    service.getColombiaData().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/Country/Colombia`);
    req.flush(mockApiResponse); // Respondemos para que se guarde en signal

    // PASO 2: Segunda llamada
    service.getColombiaData().subscribe((data) => {
      expect(data).toEqual(expectedDomainData);
    });

    // PASO 3: Verificar que NO hubo una segunda petición HTTP
    // httpMock.verify() en el afterEach se encargará de fallar si hubo petición extra,
    // pero podemos ser explícitos:
    httpMock.expectNone(`${environment.apiUrl}/Country/Colombia`);
  });
});