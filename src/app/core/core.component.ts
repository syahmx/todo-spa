import { AuthService } from './../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  jwtHelper = new JwtHelperService()

  constructor(private user: UserService, private auth: AuthService) { }

  ngOnInit() {
    let token = localStorage.getItem('token')

    if (token) {
      let id = this.jwtHelper.decodeToken(token).nameid
      this.user.getUserData(id)
    }
  }

}
