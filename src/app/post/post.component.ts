import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { stack } from 'tns-core-modules/ui/frame/frame';
import { PhotoService } from '../photo.service';
import { fromAsset, ImageSource } from 'tns-core-modules/image-source/image-source';
import * as imagepicker from "nativescript-imagepicker";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

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

  categories: string[] = ["Category 1", "Category 2","Category 3", "Category 4","Category 5", "Category 6"];
  photo: Photo = new Photo("", [""]);
  isImageSaved: boolean = false;

  @ViewChild("image")
  image: ElementRef;

  ngOnInit() {}

  dialogGetImage() {
    dialogs.action(
      "Choose a source for your image: ", 
      "Cancel", 
      ["Gallery", "Camera"])
        .then(res => res === "Gallery" ? this.startGallery() : this.startCamera());
  }

  startGallery() {
    let context = imagepicker.create({ mode: "single"});
    context.authorize()
      .then(() => context.present())
      .then(sel => this.saveBase64(sel[0]))
      .catch(e => console.log(e));
  }

  startCamera() {
    camera.requestPermissions()
      .then(() => camera.takePicture()
        .then(s => this.saveBase64(s))
        .catch(() => console.log("Error taking photo!"))
      )
      .catch(() => console.log("Error with perms!"));
  }

  saveBase64(asset: ImageAsset) {
    this.image.nativeElement.src = asset;
    fromAsset(asset).then(res => {
      this.photo.base64 = res.toBase64String('png', 50); 
      this.isImageSaved = true;
    });
  }

  public onSelectCategory(args: SelectedIndexChangedEventData) {
    console.log("Selected: " + this.categories[args.newIndex]);
}

  submit() {
    this.photoService
      .postPhoto(this.photo)
      .subscribe(resp => console.log(resp['message']));
  }

}
