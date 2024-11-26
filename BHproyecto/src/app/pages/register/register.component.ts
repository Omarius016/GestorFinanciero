import { Component } from '@angular/core';
import { AuthHeroComponent } from '../../shared/components/auth-hero/auth-hero.component';
import { SharedModule } from '../../shared/shared.module'; 
import { RegisterFormComponent } from './components/register-form/register-form.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterFormComponent,
    SharedModule,
    AuthHeroComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isLoading = false;

  handleLoadingChange(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
