import { AddModalComponent } from './add-modal/add-modal.component';
import { List } from './../../../model/list';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AlertifyService } from '../../services/alertify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: List;

  constructor(private _list: ListService, private _user: UserService, private router: Router,
    private modalService: NgbModal, private alert: AlertifyService) { }

  ngOnInit() {
    setTimeout(() => {
      let id = this.router.url.split('/')[3]
      let check = this._user.checkList(id)

      this.router.navigate([check.url])
      if (check.id) this._list.getListData(check.id)
    }, 500)
  }

  getData() {
    this._list.listData
      .pipe(filter(x => x != null))
      .subscribe((
        (next: List) => {
          this.list = next;
        }
      ))
  }

  add(category) {
    const modalRef = this.modalService.open(AddModalComponent)
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.listId = this.list.id;
    modalRef.componentInstance.listName = this.list.listname;

    modalRef.result.then(res => {
      if (res) {
        this._list.getListData(this.list.id)
        this.alert.success(`${category} added`)
      }
    }).catch(err => { })
  }
}
