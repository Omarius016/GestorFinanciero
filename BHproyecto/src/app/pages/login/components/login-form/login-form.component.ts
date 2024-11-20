import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidationErrors, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hidePassword = true;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email, this.emailValidator()]], // Aquí aplicamos el validador personalizado
      password: ['', Validators.required]
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
      console.log(this.loginForm.value);
    }
  }
}
