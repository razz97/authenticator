import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { User } from '../model/user';
import { SnackBar } from "nativescript-snackbar";
import * as utils from "tns-core-modules/utils/utils";
import * as localStorage from 'nativescript-localstorage';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  user: User = new User();
  invalidCredentials: boolean = false;
  loader = new LoadingIndicator();
  snackbar = new SnackBar();
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != "null") {
      this.router.navigate(['discover']);
    }
  }

  submit() {
    this.loader.show();
    this.userService.login(this.user)
      .subscribe((resp) => {
        if (resp['code'] == 1) {
          localStorage.setItem('token',resp['data']);
          this.router.navigate(["discover"]);
        } else {
          this.user.password = "";
          utils.ad.dismissSoftInput();
          this.snackbar.simple("Invalid credentials");
        }
        this.loader.hide();
      });
  }

}
