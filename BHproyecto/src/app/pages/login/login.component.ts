import { Component } from '@angular/core';
import { LoginHeroComponent } from './components/login-hero/login-hero.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginHeroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
