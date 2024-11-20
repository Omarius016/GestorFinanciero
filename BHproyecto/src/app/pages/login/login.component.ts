import { Component } from '@angular/core';
import { AuthHeroComponent } from '../../shared/components/auth-hero/auth-hero.component';
import { LoginFormComponent } from '../login/components/login-form/login-form.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthHeroComponent, 
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
