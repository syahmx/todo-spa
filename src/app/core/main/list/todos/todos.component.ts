import { Item } from './../../../../model/item';
import { List } from './../../../../model/list';
import { ListService } from './../../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  listData: List;
  items: Item[];

  constructor(private list: ListService) { }

  ngOnInit() {
    this.list.listData
      .pipe(filter(x => x != null))
      .subscribe((
        next => {
          this.listData = next;
          this.items = next.items.filter(x => x.remindAt == null);
        }
      ))
  }

  isComplete(item) {
    item.isCompleted = !item.isCompleted
  }
}
