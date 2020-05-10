import { ItemForAdd } from './../../model/item';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  helper = new JwtHelperService()
  baseUrl = 'http://localhost:5000/api/users/'

  constructor(private http: HttpClient) { }

  addItem(listId, data: ItemForAdd) {
    return this.http.post(`${this.baseUrl}${this.getUser()}/lists/${listId}/items`, data)
  }

  removeItem(listId, itemId) {
    return this.http.delete(`${this.baseUrl}${this.getUser()}/lists/${listId}/items/${itemId}`)
  }

  updateItem(listId, itemId, data) {
    return this.http.put(`${this.baseUrl}${this.getUser()}/lists/${listId}/items/${itemId}`, data)
  }

  getUser() {
    return this.helper.decodeToken(localStorage.getItem('token')).nameid
  }
}
