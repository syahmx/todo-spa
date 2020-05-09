import { Item } from 'src/app/model/item';
import { EditModalComponent } from './../edit-modal/edit-modal.component';
import { List } from './../../../../model/list';
import { filter } from 'rxjs/operators';
import { ListService } from './../../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  listData: List;
  items: Item[];
  model: NgbDateStruct;

  constructor(private list: ListService, private calendar: NgbCalendar, private modalService: NgbModal) { }

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
    item.isCompleted = !item.isCompleted
  }

  async edit(item) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.category = 'Reminder';

    let data = await modalRef.result
    console.log(data)
  }

  delete(item) {
    let i = this.items.findIndex(x => x == item)
    this.items.splice(i, 1)
  }
}
