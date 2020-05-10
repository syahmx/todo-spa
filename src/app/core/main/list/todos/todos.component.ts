import { EditModalComponent } from './../edit-modal/edit-modal.component';
import { AlertifyService } from './../../../services/alertify.service';
import { ItemService } from './../../../services/item.service';
import { Item } from './../../../../model/item';
import { List } from './../../../../model/list';
import { ListService } from './../../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  listData: List;
  items: Item[] = [];

  constructor(private list: ListService, private item: ItemService, private alert: AlertifyService, private modalService: NgbModal) { }

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
    let data = {
      title: item.title,
      description: item.description,
      isCompleted: !item.isCompleted,
      remindAt: item.remindAt,
      created: item.created
    }

    this.item.updateItem(this.listData.id, item.id, data).subscribe(
      res => {
        item.isCompleted = !item.isCompleted
      }, err => {
        this.alert.error('Oops, fail to update. Check your internet connection.')
      }
    )
  }

  edit(item) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.itemData = item;
    modalRef.componentInstance.category = 'Task';
    modalRef.componentInstance.listId = this.listData.id;

    modalRef.result.then(res => {
      if (res) {
        this.list.getListData(this.listData.id)
        this.alert.success('Update successful')
      }
    }).catch(err => { })
  }

  delete(item) {
    this.item.removeItem(this.listData.id, item.id).subscribe(
      res => {
        this.removeItem(item)
        this.list.getListData(this.listData.id)
      }, err => {
        this.alert.error('Oops, fail to delete. Check your internet connection.')
      }
    )
  }

  removeItem(item) {
    let i = this.items.findIndex(x => x.id == item.id)
    this.items.splice(i, 1)
  }
}
