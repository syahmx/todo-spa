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
    this.user.getUserData()
    this.http.get(`${this.baseUrl}users/${this.user.user.id}/lists/${listId}`).subscribe(
      res => {
        this.listData.next(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  add(listName) {
    function addZero(val) {
      return `${('0' + val).slice(-2)}`
    }

    let d = new Date()
    let today = `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}T${addZero(d.getHours() % 12)}:${addZero(d.getMinutes())}:00`

    let data = {
      listName: listName,
      created: today
    }

    return this.http.post(`${this.baseUrl}users/${this.user.user.id}/lists`, data)
  }

  update(listId, data) {
    return this.http.put(`${this.baseUrl}users/${this.user.user.id}/lists/${listId}`, data)
  }

  delete(listId) {
    return this.http.delete(`${this.baseUrl}users/${this.user.user.id}/lists/${listId}`)
  }
}
