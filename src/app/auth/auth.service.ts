import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserForLogin, UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService()
  baseUrl = 'http://localhost:5000/api/auth/'
  userId: number
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  checkLoginStatus(url: string) {
    let token = localStorage.getItem('token')
    if (!token) return this.router.navigate(['/auth/login'])

    let isExpired = this.jwtHelper.isTokenExpired(token)
    if (isExpired) return this.router.navigate(['/auth/login'])

    this.isLoggedIn = true
    this.router.navigate([url])
  }

  login(user: UserForLogin) {
    return this.http.post(this.baseUrl + 'login', user)
  }

  doLoginUser(data) {
    localStorage.setItem('token', data.token)
    this.userId = data.id
  }

  register(user: UserForRegister) {
    return this.http.post(this.baseUrl + 'register', user)
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['auth/login'])
  }
}
