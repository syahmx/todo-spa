import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.userData
      .pipe(filter(x => x != null))
      .subscribe(res => {
        this.name = res.name;
      })
  }

}
