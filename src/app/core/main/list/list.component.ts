import { List } from './../../../model/list';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listData: List;
  items: Item[];

  constructor(private list: ListService, private user: UserService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      let listName = this.router.url.split('/')[3]
      let listData = this.user.user.lists.filter(x => x.listName == decodeURIComponent(listName))[0]
      if (listData) {
        let listId = listData.id
        this.list.getListData(listId)
        this.getData()
      } else {
        this.router.navigate(['/'])
      }
    }, 500)
  }

  getData() {
    this.list.listData
      .pipe(filter(x => x != null))
      .subscribe((
        (next: List) => {
          this.listData = next;
          this.items = next.items;
        }
      ))
  }
}
