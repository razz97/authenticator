import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { PhotoService } from '../photo.service';
import { fromAsset } from 'tns-core-modules/image-source/image-source';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { Router } from '@angular/router';
import { Photo } from '../model/photo';
import * as imagepicker from "nativescript-imagepicker";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as camera from "nativescript-camera";

@Component({
  selector: 'ns-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  moduleId: module.id,
})
export class PostComponent implements OnInit {

  constructor(public photoService: PhotoService,private router: Router) { }

  @ViewChild("image") image: ElementRef;
  categories: string[] = [];
  photo: Photo = new Photo("", "");
  isImageSaved: boolean = false;
  selectedCategory: string = "";
  loader = new LoadingIndicator();

  ngOnInit() {
    this.photoService.getCategories().subscribe(resp => this.categories = resp['data']);
  }

  dialogGetImage() {
    dialogs.action(
      "Choose a source for your image: ", 
      "Cancel", 
      ["Gallery", "Camera"]
    ).then(res => res === "Gallery" ? this.startGallery() : this.startCamera());
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

  onSelectCategory(args: SelectedIndexChangedEventData) {
    this.selectedCategory = this.categories[args.newIndex];
  }

  submit() {
    this.photo.category = this.selectedCategory;
    this.loader.show();
    this.photoService
      .postPhoto(this.photo)
      .subscribe(resp => this.loader.hide());
  }

  back() {
    this.router.navigate(["discover"]);
  }

}
