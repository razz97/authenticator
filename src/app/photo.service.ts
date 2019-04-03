import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Photo } from './post/post.component';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  url = "http://alexraspberry.ddns.net:8080/";
  options = { 
    headers: new HttpHeaders(
      {"Content-Type":"application/json", 
      "Authorization": localStorage.getItem('token')}) 
  };

  postPhoto(photo: Photo) {
    return this.http.post(this.url + "postPhoto.php",photo,this.options);
  }

}
