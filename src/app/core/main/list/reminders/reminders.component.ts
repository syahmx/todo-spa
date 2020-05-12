import { AlertifyService } from './../../../services/alertify.service';
import { ItemService } from './../../../services/item.service';
import { Item } from 'src/app/model/item';
import { EditModalComponent } from './../edit-modal/edit-modal.component';
import { List } from './../../../../model/list';
import { filter } from 'rxjs/operators';
import { ListService } from './../../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  listData: List;
  items: Item[] = [];
  model: NgbDateStruct;

  constructor(private list: ListService, private item: ItemService, private modalService: NgbModal, private alert: AlertifyService) { }

  ngOnInit() {
    this.list.listData
      .pipe(filter(x => x != null))
      .subscribe((
        next => {
          this.listData = next;
          this.items = next.items.filter(x => x.remindAt != null);
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
        console.log(err);
      }
    )
  }

  edit(item) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.itemData = item;
    modalRef.componentInstance.category = 'Reminder';
    modalRef.componentInstance.listId = this.listData.id;

    modalRef.result.then(res => {
      console.log(res)
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
