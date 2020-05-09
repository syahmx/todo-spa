import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  baseUrl = 'http://localhost:5000/api/'
  listData = new BehaviorSubject(null);
  list;

  constructor(private http: HttpClient, private user: UserService) { }

  getListData(listId) {
    this.http.get(`${this.baseUrl}users/${this.user.user.id}/lists/${listId}`).subscribe(
      res => {
        this.listData.next(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
