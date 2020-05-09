import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.auth.checkLoginStatus(this.router.url)
      this.isLoading = false;
    }, 500)
  }
}
