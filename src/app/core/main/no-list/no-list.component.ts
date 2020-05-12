import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-no-list',
  templateUrl: './no-list.component.html',
  styleUrls: ['./no-list.component.scss']
})
export class NoListComponent implements OnInit {
  name;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.userData
      .pipe(filter(x => x != null), take(1))
      .subscribe(res => {
        this.name = res.name;
      })
  }

}
