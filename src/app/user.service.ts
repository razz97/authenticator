import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './login/login.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "http://alexraspberry.ddns.net:8080/";
  options = { 
    headers: new HttpHeaders({"Content-Type":"application/json"}) 
  };

  login(user: User) {
    let options = { 
      headers: new HttpHeaders({"Content-Type":"application/json"}),
      params: new HttpParams().set("username",user.username).set("password", user.password)
    };
    return this.http.get(this.url + "login.php",options);
  }

  register(user: User) {
    return this.http.post(this.url + "register.php", user,this.options);
  }
}
