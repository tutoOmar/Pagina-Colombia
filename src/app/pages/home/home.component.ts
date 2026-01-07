import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ColombiaMapper } from '../../mappers/colombia.mapper';
import { Colombia } from '../../models/dominio/colombia.model';
import { ColombiaDataService } from '../../services/colombia-data/colombia-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
 private colombiaService = inject(ColombiaDataService);

  data = signal<Colombia | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

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

  formatPopulation(population: number): string {
    return ColombiaMapper.formatPopulation(population);
  }

  formatSurface(surface: number): string {
    return ColombiaMapper.formatSurface(surface);
  }
}
