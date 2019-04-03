import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { stack } from 'tns-core-modules/ui/frame/frame';
import { PhotoService } from '../photo.service';
import { fromAsset, ImageSource } from 'tns-core-modules/image-source/image-source';

export class Photo {
  constructor(
    public base64: string,
    public categories: [string]
  ) {}
}

@Component({
  selector: 'ns-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  moduleId: module.id,
})
export class PostComponent implements OnInit {

  constructor(public photoService: PhotoService) { }

  photo: Photo = new Photo("", [""]);

  @ViewChild("image")
  image: ElementRef;

  ngOnInit() {
    camera.requestPermissions().then( () => { 
      camera.takePicture().then((imageAsset: ImageAsset) => {
        fromAsset(imageAsset).then((res: ImageSource) => {
          this.photo.base64 = res.toBase64String('png', 50); 
          this.photoService.postPhoto(this.photo).subscribe(() => this.image.nativeElement.src = imageAsset);
        });
      }).catch((err) => console.log(err));
    }, () => console.log("User denied perms!!!"));
  
  }

}
