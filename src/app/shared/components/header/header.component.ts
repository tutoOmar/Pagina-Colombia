import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styles:[`
    .header-top{
      background-image: 
        /* CAPA 1: Overlay oscuro para que se lea el texto blanco (negro al 65% de opacidad) */
        linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)),
        
        /* CAPA 2: La Bandera dibujada con CSS (respetando las proporciones 50/25/25) */
        linear-gradient(to bottom, 
          #FCD116 0%,   #FCD116 50%,  /* Amarillo: del 0% al 50% del alto */
          #003893 50%,  #003893 75%,  /* Azul: del 50% al 75% del alto */
          #CE1126 75%,  #CE1126 100%  /* Rojo: del 75% al 100% del alto */
        );
      
      /* Aseguramos que cubra todo */
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    `]
})
export class HeaderComponent {
// Variable para controlar el estado del menú móvil
  isMenuOpen = false;

  // Función para abrir/cerrar
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Función para cerrar el menú cuando se hace clic en un enlace
  closeMenu() {
    this.isMenuOpen = false;
  }
}
