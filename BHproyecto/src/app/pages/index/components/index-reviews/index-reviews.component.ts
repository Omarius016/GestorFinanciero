import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Review {
  nombre: string;
  comentario: string;
  puntuacion: number;
}

@Component({
  selector: 'app-index-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index-reviews.component.html',
  styleUrl: './index-reviews.component.css'
})
export class IndexReviewsComponent {
  reviews: Review[] = [
    {
      nombre: 'Neo-Ram',
      comentario: 'Esta aplicación es limpia, clara y muy útil (¡y divertida!) de usar. Puedes registrar cualquier compra que desees y crear tus propias categorías. La interfaz es limpia y fácil de usar. Recomiendo esta aplicación para cualquiera que quiera hacer un seguimiento de sus gastos.',
      puntuacion: 5
    },
    {
      nombre: 'Juan_CB',
      comentario: '¡ESTA APLICACIÓN ES INCREÍBLE! Literalmente pasé OCHO HORAS tratando de encontrar una buena aplicación de presupuesto. Esta aplicación te AYUDA a presupuestar tu dinero, en lugar de tratar de hacerlo por ti y presentarte información innecesaria. Me encanta. 100/10. Siento que finalmente encontré la aplicación de presupuesto perfecta.',
      puntuacion: 5
    },
    {
      nombre: 'Danix_132',
      comentario: 'He estado buscando las mejores y más confiables aplicaciones de gestión de dinero durante años, y finalmente encontré Smart Wallet. He sido un usuario desde diciembre de 2023 con la versión pro, que vale 100% la pena. ¡No tengo ninguna queja!',
      puntuacion: 5
    }
  ];
}
