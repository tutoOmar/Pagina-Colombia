import { Component, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { TouristAttraction } from '../../models/dominio/touristic-attraction.model';
import { TouristicService } from '../../services/touristic/touristic.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-touristic-attractions',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './touristic-attractions.component.html',
  styles: [`
      /* Ocultar la barra de scroll para que se vea limpio */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
  `]
})
export default class TouristicAttractionsComponent implements OnInit{
  private attractionService = inject(TouristicService);
  // Recibimos la signal desde el padre
  attractions = input.required<TouristAttraction[]>();
  // Datos de lugares 
  touristicAttractions = signal<TouristAttraction[] | null>(null);
  isLoadingAttractions = signal(true);
  errorAttractions = signal<string | null>(null);
  selectedAttractions: TouristAttraction[] = [];

  placeholderImage = 'images/not_available_image.png'
  // Referencia al contenedor HTML para moverlo
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
 
  ngOnInit(): void {
    this.loadTouristicAttractions();
  }
  /**
   * Carga los datos de los lugares turísticos desde el servicio
   */
  loadTouristicAttractions(): void {
    this.isLoadingAttractions.set(true);
    this.errorAttractions.set(null);
    this.attractionService.getTouristicAttractionData().subscribe({
      next: (touristAttractions) => {
        console.log('Datos de Turisticos cargados:', touristAttractions)
        this.touristicAttractions.set(touristAttractions);
        this.isLoadingAttractions.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.errorAttractions.set('No se pudieron cargar los datos de los lugares turisticos');
        this.isLoadingAttractions.set(false);
      }
    });
  }

  scroll(direction: 'left' | 'right') {
    const container = this.carouselContainer.nativeElement;
    // Calculamos cuánto mover (ancho de tarjeta aprox + gap)
    const scrollAmount = direction === 'left' ? -320 : 320; 
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
  /**
   * Maneja el error de carga de imagen y asigna una imagen de respaldo.
   * @param event 
   */
  handleImageError(event: any) {
    event.target.src = this.placeholderImage;
  }
}
