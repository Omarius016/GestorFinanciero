import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterFormComponent } from './pages/register/components/register-form/register-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterFormComponent },
];
