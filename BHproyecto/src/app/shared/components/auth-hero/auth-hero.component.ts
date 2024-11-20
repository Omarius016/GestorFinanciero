import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-auth-hero',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './auth-hero.component.html',
  styleUrl: './auth-hero.component.css'
})
export class AuthHeroComponent {
  loading = false;

  constructor(private router: Router) {}

  navigateToIndex(): void {
    console.log('Navegando...');
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/index']);
    }, 1000);
  }
}
