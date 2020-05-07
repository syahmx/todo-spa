import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isError: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$')]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        res => {
          this.auth.doLoginUser(res)
          this.router.navigate(['/'])
        },
        err => {
          this.isError = true
        }
      )
    }
  }

}
