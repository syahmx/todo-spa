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
  listData: List;

  constructor(private list: ListService, private user: UserService, private router: Router,
    private modalService: NgbModal, private alert: AlertifyService) { }

  ngOnInit() {
    setTimeout(() => {
      let id = this.router.url.split('/')[3]
      let listData = this.user.user.lists.filter(x => x.id == id)[0]
      if (listData) {
        this.list.getListData(id)
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
        }
      ))
  }

  add(category) {
    const modalRef = this.modalService.open(AddModalComponent)
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.listId = this.listData.id;
    modalRef.componentInstance.listName = this.listData.listname;

    modalRef.result.then(res => {
      if (res) {
        this.list.getListData(this.listData.id)
        this.alert.success(`${category} added`)
      }
    }).catch(err => { })
  }
}
