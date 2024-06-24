import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../api/config';
import { Login } from '../models/login.interface';
import { sha512 } from 'js-sha512';
import { AuthResponse } from '../models/authresponse.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  isLogued(): boolean {
    let token = localStorage.getItem('token_sigvet');

    if (token == null) {
      return false;
    }

    return true;
  }

  login(data: Login) {
    data.password = sha512(data.password).toString().toUpperCase();
    return this.http.post<AuthResponse>(`${URL_API}/Auth/Login`, data);
  }

  logout(): void {
    localStorage.removeItem('token_sigvet');
    localStorage.removeItem('user_vet');
    this.route.navigate(["/auth/login"]);
  }
}
