import { Component } from '@angular/core';
import { AuthHeroComponent } from '../../shared/components/auth-hero/auth-hero.component';
import { SharedModule } from '../../shared/shared.module'; 
import { LoginFormComponent } from '../login/components/login-form/login-form.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthHeroComponent, 
    LoginFormComponent,
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;

  handleLoadingChange(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
