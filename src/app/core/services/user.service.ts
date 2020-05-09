import { ListService } from './list.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/'
  userData = new BehaviorSubject(null);
  user;

  constructor(private http: HttpClient) { }

  getUserData(id) {
    this.http.get(this.baseUrl + 'users/' + id).subscribe(
      res => {
        this.userData.next(res);
        this.user = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
