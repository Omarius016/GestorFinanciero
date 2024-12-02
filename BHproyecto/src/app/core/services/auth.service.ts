import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Cambia esto a tu URL de backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', email); // Debe ser 'username' por OAuth2
    formData.append('password', password);

    return this.http.post(`${this.apiUrl}/login`, formData);
  }

  register(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  // Método para obtener el usuario actual
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me`);
  }

  // Método para cambiar la contraseña
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const formData = new FormData();
    formData.append('old_password', oldPassword);
    formData.append('new_password', newPassword);

    return this.http.put(`${this.apiUrl}/users/change_password`, formData);
  }

  // Método para eliminar la cuenta
  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete_account`);
  }
}
