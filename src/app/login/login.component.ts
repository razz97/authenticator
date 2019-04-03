import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UrlSerializer, Router } from '@angular/router';
import { UserService } from '../user.service';
import * as localStorage from 'nativescript-localstorage';

export class User {

  constructor(
    public username: string = "",
    public password: string = ""
  ) {}

  equals(user: User): boolean {
    return this.username === user.username;
  }
}

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  user: User = new User();
  invalidCredentials: boolean = false;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {}

  submit() {
    this.userService.login(this.user)
      .subscribe((resp) => {
        if (resp['code'] == 1) {
          localStorage.setItem('token',resp['data']);
          this.router.navigate(["discover"]);
        } else {
          this.invalidCredentials = true;
        }
      });
  }

}
