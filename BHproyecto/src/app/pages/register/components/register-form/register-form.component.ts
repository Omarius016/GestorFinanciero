import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidationErrors, AbstractControl, ValidatorFn} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  @Output() spinnerStateChange = new EventEmitter<boolean>();

  registerForm: FormGroup;
  hidePassword = true;
  hasMinLength = false;
  hasUpperCase = false;
  hasSpecialChar = false;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator()]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator()
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator()
    });

    // Suscribirse a los cambios del password
    this.registerForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordRequirements(password);
    });
  }
  
  isFormValid(): boolean {
    return this.registerForm.valid;
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
    if (this.registerForm.valid) {
      this.spinnerStateChange.emit(true);
      
      const { email, password } = this.registerForm.value;
      
      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.spinnerStateChange.emit(false);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.spinnerStateChange.emit(false);
        }
      });
    }
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
  
      if (password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  checkPasswordRequirements(password: string) {
    this.hasMinLength = password.length >= 8;
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Forzar la revalidación del campo password
    this.registerForm.get('password')?.updateValueAndValidity();
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
