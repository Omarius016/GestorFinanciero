import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-index-features',
  standalone: true,
  imports: [],
  templateUrl: './index-features.component.html',
  styleUrl: './index-features.component.css'
})
export class IndexFeaturesComponent implements AfterViewInit {
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-left');
          // Una vez que se active la animación, podemos dejar de observar
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 }); // La animación comenzará cuando el 20% del elemento sea visible

    // Observa la imagen
    const image = document.querySelector('.feature-image');
    if (image) {
      observer.observe(image);
    }
  }
}
