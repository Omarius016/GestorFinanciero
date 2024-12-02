import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { Router } from '@angular/router';

// Convertir la clase interceptora en una función interceptora
const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return new AuthInterceptor(router).intercept(req, next);
};

// Asegúrate de exportar la configuración
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptorFn])
    )
  ]
};