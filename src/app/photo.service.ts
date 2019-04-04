import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Photo } from './model/photo';
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
    return this.http.post(this.url + "photo.php",photo,this.options);
  }

  getCategories() {
    return this.http.get(this.url + "category.php", this.options);
  }

  getPhotos() {
    return this.http.get(this.url + "photo.php", this.options);
  }

}
