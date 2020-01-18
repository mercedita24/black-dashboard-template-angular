import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = environment.serverUrl;


  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${this.getToken()}`
  })

  constructor(private _http : HttpClient) { }

  login(usuario: User): Observable<User> {
    return this._http.post<User>(`${this.url}/auth/login`, usuario);
  }

  logout(): Observable<any> {
    localStorage.removeItem('userid');
    return this._http.post<any>(`${this.url}/auth/logout`, null, { headers: this.headers });
  }

  handleToken(token){
    this.setToken(token);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isValidToken() {
    const token = this.getToken(); 

    if (token) {
      const payload = this.getPayloadToken(token);

      if (payload) {
        // ISS representa el servidor de donde proviene el token. Se valida que regrese del servidor oficial ('http://127.0.0.1:8000/api/v1')
        return payload.iss == `${this.url}/auth/login` ? true : false;
      }
    }

    return false;
  }

  getPayloadToken(token) {
    // Para obtener la porcion payload del token que se encuentra en la posición 1 del arreglo
    const payload = token.split('.')[1];
    return this.decodeToken(payload);
  }

  decodeToken(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValidToken();
  }
}
