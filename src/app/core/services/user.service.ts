import { User } from './../../model/user';
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
  user: User;
  helper = new JwtHelperService()

  constructor(private http: HttpClient) { }

  getUserData() {
    this.http.get(this.baseUrl + 'users/' + this.getUserId()).subscribe(
      (res: User) => {
        this.userData.next(res);
        this.user = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  checkList(id) {
    let list = this.user.lists.filter(x => x.id == id)[0]
    if (list) {
      return {
        url: `app/list/${id}`,
        id: id
      }
    } else if (this.user.lists.length > 0) {
      return {
        url: `app/list/${this.user.lists[0].id}`,
        id: this.user.lists[0].id
      }
    } else {
      return {
        url: 'app/no-list',
        id: null
      }
    }
  }

  getUserId() {
    return this.helper.decodeToken(localStorage.getItem('token')).nameid
  }
}
