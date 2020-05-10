import { Router } from '@angular/router';
import { ConfirmModalComponent } from './../../shared/confirm-modal/confirm-modal.component';
import { AlertifyService } from './../services/alertify.service';
import { ListService } from './../services/list.service';
import { AuthService } from './../../auth/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  lists: {
    listName: string;
    id: number;
    itemCount: number;
    onEdit: boolean;
  }[];
  onEdit: boolean = false;
  addingList: boolean = false;
  newListName: string;

  constructor(private user: UserService, private auth: AuthService, private list: ListService,
    private alert: AlertifyService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.user.userData.pipe(filter(x => x != null))
      .subscribe(res => {
        this.lists = res.lists
      })
  }

  changeList(list) {
    if (!this.onEdit) {
      this.list.getListData(list.id)
    }
  }

  addList(listName) {
    if (listName != null || listName != '' && listName.length < 20) {
      this.list.add(listName).subscribe(
        res => {
          this.newListName = ''
          this.user.getUserData()
          this.addingList = false
        }, err => {
          this.alert.error('Adding list failed, try again')
        }
      )
    }
  }

  update(list) {
    this.list.update(list.id, { listName: list.listName }).subscribe(
      res => {
        this.alert.success('Update successful')
        list.onEdit = false;
      },
      err => {
        this.alert.error('Update failed, try again')
      }
    )
  }

  async delete(list) {
    const modalRef = this.modalService.open(ConfirmModalComponent)
    modalRef.componentInstance.title = "Are you sure?"
    modalRef.componentInstance.message = "This will remove all reminders and tasks in the list."

    modalRef.result.then(res => {
      if (res) {
        this.list.delete(list.id).subscribe(
          res => {
            this.alert.success('List deleted')
            this.user.getUserData()
            let id = this.router.url.split('/')[3]

            if (id == list.id) {
              this.router.navigate(['app', 'list', this.lists[0].id])
              this.list.getListData(this.lists[0].id)
            }
          },
          err => {
            this.alert.error('Delete failed, try again')
          }
        )
      } else {
        console.log('cancelled');
      }
    }).catch(err => { })
  }

  resetEdit() {
    for (let i = 0; i < this.lists.length; i++) {
      this.lists[i].onEdit = false;
    }
  }

  logout() {
    this.auth.logout()
  }
}