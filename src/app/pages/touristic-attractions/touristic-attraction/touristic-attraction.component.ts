import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TouristicService } from '../../../services/touristic/touristic.service';
import { TouristAttraction } from '../../../models/dominio/touristic-attraction.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-touristic-attraction',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './touristic-attraction.component.html',
  styleUrl: './touristic-attraction.component.css'
})
export default class TouristicAttractionComponent implements OnInit{
  private attractionService = inject(TouristicService);

  id = input.required<string>(); 
  touristicAttraction = signal<TouristAttraction | null>(null);
  isLoadingAttraction = signal(true);
  errorAttraction = signal<string | null>(null);
  placeholderImage = 'images/not_available_image.png'

  ngOnInit() {
    if(this.id()){
      this.loadAttractionDetails(this.id());
    }
  }
  /**
   * Carga los detalles de un lugar turistico por su ID
   * @param id 
   */
  loadAttractionDetails(id:string):void{
    this.attractionService.getTouristicAttractionById(id).subscribe({
      next: (touristAttraction) => {
        console.log('Datos de Turisticos cargados:', touristAttraction)
        this.touristicAttraction.set(touristAttraction);
        this.isLoadingAttraction.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.errorAttraction.set('No se pudieron cargar los datos de los lugares turisticos');
        this.isLoadingAttraction.set(false);
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = this.placeholderImage;
  }
}
