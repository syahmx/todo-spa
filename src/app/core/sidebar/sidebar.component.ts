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
    onEdit?: boolean;
    newListName?: string;
  }[] = [];
  activeListId: number;
  onEdit: boolean = false;
  addingList: boolean = false;
  newListName: string;

  constructor(private _user: UserService, private auth: AuthService, private _list: ListService,
    private alert: AlertifyService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.activeListId = this.router.url.split('/')[3] ? parseInt(this.router.url.split('/')[3]) : null
    }, 500)

    this._user.userData.pipe(filter(x => x != null))
      .subscribe(res => {
        this.lists = res.lists
      })
  }

  changeList(list) {
    if (!this.onEdit && list.id != this.activeListId) {
      this.activeListId = list.id
      this._list.getListData(list.id)
    }
  }

  addList(listName) {
    if (listName) {
      if (listName != null || listName != '' && listName.length < 20) {
        this._list.add(listName).subscribe(
          res => {
            this.newListName = ''
            this._user.getUserData()
            this.addingList = false
            this.alert.success('New list added')
          }, err => {
            this.alert.error('Adding list failed, try again')
          }
        )
      }
    }
  }

  update(list) {
    if (list.listName != list.newListName) {
      this._list.update(list.id, { listName: list.newListName }).subscribe(
        res => {
          this._user.getUserData()
          this.alert.success('Update successful')
          list.onEdit = false;
        },
        err => {
          this.alert.error('Update failed, try again')
        }
      )
    } else {
      list.onEdit = false;
    }
  }

  async delete(list) {
    const modalRef = this.modalService.open(ConfirmModalComponent)
    modalRef.componentInstance.title = "Are you sure?"
    modalRef.componentInstance.message = "This will remove all reminders and tasks in the list."

    modalRef.result.then(res => {
      if (res) {
        this._list.delete(list.id).subscribe(
          res => {
            this.alert.success('List deleted')
            this._user.getUserData()
            let id = this.router.url.split('/')[3]
            if (this.lists.length == 1) {
              this.router.navigate(['app', 'no-list'])
            } else if (id == list.id) {
              this.router.navigate(['app', 'list', this.lists[0].id])
              this._list.getListData(this.lists[0].id)
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
    this.newListName = ''
    for (let i = 0; i < this.lists.length; i++) {
      this.lists[i].onEdit = false;
    }
  }

  logout() {
    this.auth.logout()
  }
}