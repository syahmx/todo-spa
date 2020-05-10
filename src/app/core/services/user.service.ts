import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/'
  userData = new BehaviorSubject(null);
  user;
  helper = new JwtHelperService()

  constructor(private http: HttpClient) { }

  getUserData() {
    this.http.get(this.baseUrl + 'users/' + this.getUserId()).subscribe(
      res => {
        this.userData.next(res);
        this.user = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getUserId() {
    return this.helper.decodeToken(localStorage.getItem('token')).nameid
  }
}
