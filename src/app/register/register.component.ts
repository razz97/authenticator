import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../login/login.component';
import * as localStorage from 'nativescript-localstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  moduleId: module.id,
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  passwordConfirm: string = "";
  invalid: boolean = false;
  error: string = "";

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {}

  submit() {
    if (this.passwordConfirm !== this.user.password) {
      this.invalid = true;
      this.error = "Passwords aren't equal.";
      return;
    }
    this.invalid = false;
    this.userService.register(this.user)
      .subscribe((resp) => {
        if (resp['code'] == 1) {
          localStorage.setItem('token',resp['data']);
          this.router.navigate(["discover"]);
        } else {
          this.invalid = true;
          this.error = resp['message'];
        }
      });
  }

}
