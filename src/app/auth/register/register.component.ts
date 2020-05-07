import { UserForRegister } from './../../model/user-for-register';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isError: boolean = false;
  usernameIsExists: boolean = false;
  isRegistered: boolean = false;
  countdown: number = 3;
  triedUsername: string = '';

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm()

    this.registerForm.controls.username.valueChanges.subscribe((currentUsername) => {
      if (currentUsername != this.triedUsername) this.usernameIsExists = false
      else if (this.triedUsername != '' && currentUsername == this.triedUsername) this.usernameIsExists = true
    })
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      username: [null, [Validators.required, Validators.minLength(4), Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator })
  }

  passwordMatchValidator(f: FormGroup) {
    return f.get('password').value == f.get('confirmPassword').value ? null : { 'mismatch': true }
  }

  register() {
    if (this.registerForm.valid) {
      let user: UserForRegister = {
        name: this.registerForm.value.name.toUpperCase(),
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      }

      this.auth.register(user).subscribe(
        res => {
          this.isRegistered = true;

          let x = setInterval(() => {
            this.countdown -= 1

            if (this.countdown === 0) {
              clearInterval(x)
              this.router.navigate(['auth/login'])
            }
          })
        },
        err => {
          this.usernameIsExists = true
          this.triedUsername = this.registerForm.value.username
        }
      )
    }
  }
}
