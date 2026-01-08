import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ColombiaMapper } from '../../mappers/colombia.mapper';
import { Colombia } from '../../models/dominio/colombia.model';
import { ColombiaDataService } from '../../services/colombia-data/colombia-data.service';
import { CardPresentationComponent } from '../../shared/components/card-presentation/card-presentation.component';
import { ICONS } from '../../models/ui/icons.model';
import { TouristAttraction } from '../../models/dominio/touristic-attraction.model';
import { TouristicService } from '../../services/touristic/touristic.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardPresentationComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  // Inyección de servicios
  private colombiaService = inject(ColombiaDataService);
  private attractionService = inject(TouristicService);
  // Variables y señales
  public icons = ICONS;
  data = signal<Colombia | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);
  // Datos de lugares 
  touristicAttractions = signal<TouristAttraction[] | null>(null);
  isLoadingAttractions = signal(true);
  errorAttractions = signal<string | null>(null);
  selectedAttractions: TouristAttraction[] = [];

  placeholderImage = 'images/not_available_image.png'
  
  ngOnInit(): void {
    this.loadData();
    this.loadTouristicAttractions();
  }
  /**
   * Carga los datos de Colombia desde el servicio
   */
  loadData(): void {
    this.isLoading.set(true);
    this.error.set(null);
    console.log('Cargando datos de Colombia...');
    this.colombiaService.getColombiaData().subscribe({
      next: (colombia) => {
        console.log('Datos de Colombia cargados:', colombia)
        this.data.set(colombia);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.error.set('No se pudieron cargar los datos de Colombia');
        this.isLoading.set(false);
      }
    });
  }

  loadTouristicAttractions(): void {
    this.isLoadingAttractions.set(true);
    this.errorAttractions.set(null);
    this.attractionService.getTouristicAttractionData().subscribe({
      next: (touristAttractions) => {
        console.log('Datos de Turisticos cargados:', touristAttractions)
        this.touristicAttractions.set(touristAttractions);
        this.isLoading.set(false);
        this.selectRandomAttractions();
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.error.set('No se pudieron cargar los datos de los lugares turisticos');
        this.isLoading.set(false);
      }
    });
  }

  formatPopulation(population: number): string {
    return ColombiaMapper.formatPopulation(population);
  }

  formatSurface(surface: number): string {
    return ColombiaMapper.formatSurface(surface);
  }
  scrollToDetails() {
    const element = document.getElementById('details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  /**
   * Traduce los nombres de los idiomas al español
   * @param languages 
   * @returns 
   */
  translateLanguages(languages: string[]): string[] {
    return ColombiaMapper.translateLanguages(languages);
  }
  /**
   * Selecciona 3 lugares turísticos aleatorios para mostrar en la página principal
   */
  selectRandomAttractions() {
    // 1. Copiamos el array para no mutar el original
    // 2. Lo mezclamos (shuffle)
    // 3. Tomamos los primeros 3
    const attractions = this.touristicAttractions() ?? [];
    if (attractions.length) {
      console.log()
      this.selectedAttractions = [...attractions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    } else {
      this.selectedAttractions = [];
    }
  }
  /**
   * Maneja el error de carga de una imagen, reemplazándola por una imagen placeholder
   * @param event 
   */
  handleImageError(event: any) {
    event.target.src = this.placeholderImage;
  }
}
