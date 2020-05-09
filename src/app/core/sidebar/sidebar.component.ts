import { ListService } from './../services/list.service';
import { AuthService } from './../../auth/auth.service';
import {
  UserService
}

  from './../services/user.service';

import {
  Component,
  OnInit
}

  from '@angular/core';

import {
  filter
}

  from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
}

) export class SidebarComponent implements OnInit {
  lists: {
    listName: string;
    id: number;
  };
  activeList;

  constructor(private user: UserService, private auth: AuthService, private list: ListService) { }

  ngOnInit() {
    this.user.userData.pipe(filter(x => x != null)).subscribe(res => {
      this.lists = res.lists
    }

    )
  }

  changeList(list) {
    this.activeList = list.listName
    this.list.getListData(list.id)
  }

  logout() {
    this.auth.logout()
  }
}