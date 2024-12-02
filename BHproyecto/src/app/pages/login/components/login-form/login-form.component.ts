import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidationErrors, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service'


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  
  @Output() spinnerStateChange = new EventEmitter<boolean>();

  navigateToRegister() {
    this.spinnerStateChange.emit(true);
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 1000);
  }
  
  loginForm: FormGroup;
  hidePassword = true;
  hasMinLength = false;
  hasUpperCase = false;
  hasSpecialChar = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator()]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator()
      ]]
    });

    // Suscribirse a los cambios del password
    this.loginForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordRequirements(password);
    });
  }
  
  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      
      const allowedDomains = [
        'gmail.com',
        'hotmail.com',
        'outlook.com',
        'yahoo.com',
        'yahoo.es',
        'live.com',
        'icloud.com',
        'uas.edu.mx'
      ];

      if (!email) return null;

      const basicEmailPattern = /^[a-zA-Z0-9._-]+@/;
      if (!basicEmailPattern.test(email)) {
        return { invalidFormat: true };
      }

      const domain = email.split('@')[1];
      if (!allowedDomains.includes(domain)) {
        return { invalidDomain: true };
      }
      
      return null;
    };
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.spinnerStateChange.emit(true);
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          // Guardar el token
          localStorage.setItem('token', response.access_token);
          this.spinnerStateChange.emit(false);
          // Redirigir al usuario
          this.router.navigate(['/dashboard']); // o la ruta que desees
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.spinnerStateChange.emit(false);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      });
    }
  }
  getEyePosition(): string {
    const emailControl = this.loginForm.get('email');
    const hasEmailErrors = emailControl?.touched && emailControl?.errors;
    
    // Posición base
    let topPosition = 323;
    
    // Si hay errores en el email, ajustamos la posición
    if (hasEmailErrors) {
      if (emailControl?.errors?.['required'] || emailControl?.errors?.['email']) {
        topPosition += 24; 
      }
      if (emailControl?.errors?.['invalidDomain']) {
        topPosition += 20; 
      }
    }
    
    return `${topPosition}px`;
  }

  checkPasswordRequirements(password: string) {
    this.hasMinLength = password.length >= 8;
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Forzar la revalidación del campo password
    this.loginForm.get('password')?.updateValueAndValidity();
  }

  passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      
      if (!password) return null;

      const valid = this.hasMinLength && 
                   this.hasUpperCase && 
                   this.hasSpecialChar;

      return valid ? null : { invalidPassword: true };
    };
  }
}
