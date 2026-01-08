import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { CardVariant } from '../../../models/dominio/card-variant.model';

@Component({
  selector: 'app-card-presentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-presentation.component.html',
  styles:[]
})
export class CardPresentationComponent {
  // Inputs de entra los dos primeros son los requeridos minimos
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) value: string | string[] | number = '';
  @Input() imagePath: string = '';
  @Input() variant: CardVariant = 'data';
  @Input() suffix: string = '';
  @Input() iconPath: string = '';

  // Referencia al contenedor HTML para saber cuándo es visible, esto lo usuamos para que le efecto solo ocurra cuando lo veamos
  @ViewChild('cardContainer') cardRef!: ElementRef;

  displayValue = signal<string | number>('');

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;
  /**
   * Métodos del ciclo de vida
   */
  ngOnInit() {
    if (this.variant === 'data') {
      this.displayValue.set('0'); 
    } else if (!this.isStringArray) {
      this.displayValue.set(this.value as string | number);
    }
  }

  ngAfterViewInit() {
    // Solo animamos si es variante 'data' y no es un array
    if (this.variant !== 'data' || this.isStringArray) return;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCount();
          this.hasAnimated = true;
          this.observer?.disconnect();
        }
      });
    }, { threshold: 0.2 });

    if (this.cardRef) {
      this.observer.observe(this.cardRef.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  /**
   * Determina si el valor es un array de strings
   */
  get isStringArray(): boolean {
    return Array.isArray(this.value);
  }
  // Obtiene el valor como array de strings
  get stringArrayValue(): string[] {
    return this.isStringArray ? (this.value as string[]) : [];
  }
  /**
   * 
   * @returns 
   */
  private animateCount() {
    const rawString = String(this.value).replace(/,/g, '').replace(/\./g, ''); 
    const target = parseFloat(rawString);
    if (isNaN(target)) {
      this.displayValue.set(this.value as string);
      return;
    }
    const duration = 2000; // Duración 2 segundos
    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    // Función de Easing (empieza rápido, termina lento)
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentProgress = easeOutExpo(progress);
      
      const currentNumber = Math.round(target * currentProgress);

      // Formateamos con puntos de miles (Español Colombia)
      this.displayValue.set(new Intl.NumberFormat('es-CO').format(currentNumber));
      if (frame === totalFrames) {
        clearInterval(counter);
        // Al final, aseguramos que se muestre el valor original formateado o el input exacto
        // Para evitar problemas de redondeo, seteamos el valor final formateado
         this.displayValue.set(new Intl.NumberFormat('es-CO').format(target));
      }
    }, frameDuration);
  }
}
