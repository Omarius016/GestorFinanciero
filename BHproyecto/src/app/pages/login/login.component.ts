import { Component } from '@angular/core';
import { AuthHeroComponent } from '../../shared/components/auth-hero/auth-hero.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthHeroComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
