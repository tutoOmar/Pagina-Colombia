import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para pipes si usas decimales, etc.
import { CityService } from '../../services/city/city.service';
import { CityMinimalApiResponse } from '../../models/infraestructura/city-minimal-api-response.model';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export default class CitiesComponent implements OnInit {
  private citiesService = inject(CityService);
  
  citiesData = signal<CityMinimalApiResponse[] | null>(null);
  isLoadingCities = signal(true);
  errorCities = signal<string | null>(null);
  
  // 3. Término de búsqueda (Lo que escribe el usuario)
  searchTerm = signal<string>('');

  placeholderImage = 'images/not_available_image.png';

  // 4. SIGNAL COMPUTADA (La magia)
  // Esta signal se actualiza automáticamente si citiesData O searchTerm cambian.
  filteredCities = computed(() => {
    const cities = this.citiesData();
    const term = this.searchTerm().toLowerCase().trim();

    if (!cities) return []; // Si no hay data, retorna vacío
    if (!term) return cities; // Si no hay búsqueda, retorna todo

    // Filtramos por nombre
    return cities.filter(city => 
      city.name.toLowerCase().includes(term)
    );
  });
  
  ngOnInit(): void {
    this.loadCitiesData();
  }

  loadCitiesData(): void {
    this.citiesService.getCitiesData().subscribe({
      next: (cities) => {
        console.log('Datos de Ciudades cargados:', cities);
        this.citiesData.set(cities);
        this.isLoadingCities.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.errorCities.set('No se pudieron cargar los datos de las ciudades');
        this.isLoadingCities.set(false);
      }
    });
  }

  // Método para actualizar la signal de búsqueda desde el input
  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}