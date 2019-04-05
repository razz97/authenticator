import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { PhotoService } from '../photo.service';
import { fromAsset } from 'tns-core-modules/image-source/image-source';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { Router } from '@angular/router';
import { Photo } from '../model/photo';
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch, Location } from "nativescript-geolocation";
import * as imagepicker from "nativescript-imagepicker";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as camera from "nativescript-camera";
import { SnackBar } from 'nativescript-snackbar';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'ns-post',
  templateUrl: './post.component.html',
  moduleId: module.id,
})
export class PostComponent implements OnInit {

  constructor(
    private photoService: PhotoService,
    private router: Router
  ) { }

  @ViewChild("image") image: ElementRef;
  categories: string[] = [];
  photo: Photo = new Photo("", "");
  isImageSaved: boolean = false;
  selectedCategory: string = "";
  loader = new LoadingIndicator();
  snackbar = new SnackBar();

  ngOnInit() {
    this.photoService.getCategories().subscribe(resp => this.categories = resp['data']);
  }

  dialogGetImage() {
    dialogs.action(
      "Choose a source for your image: ", 
      "Cancel", 
      ["Gallery", "Camera"]
    ).then(res => { 
      if (res === "Gallery") {
        this.startGallery();
      } else if (res === "Camera") {
        this.startCamera();
      }
    });
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
    this.selectedCategory = this.categories[args.newIndex][0];
  }

  submit() {
    this.photo.category = this.selectedCategory;
    this.loader.show();
    isEnabled().then(en => en 
      ? this.requestLocationThenPost() 
      : enableLocationRequest().then(() => this.requestLocationThenPost(),() => this.errorSnackBar())
    , () => this.errorSnackBar());
  }

  requestLocationThenPost() {
    let options = {desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000};
    getCurrentLocation(options).then(loc => {
          if (loc) {
            this.photoService.getLocationInfo(loc).subscribe((resp) => this.locationReadyPostPhoto(resp),() => this.errorSnackBar());
          } else {
            this.errorSnackBar();
          }
      }, 
      () => this.errorSnackBar()
    );
  }

  locationReadyPostPhoto(resp) {
    if (resp && resp['results'] && resp['results'][0] && resp['results'][0]['formatted_address']) {
      this.photo.location = resp['results'][0]['formatted_address'];
      this.photoService.postPhoto(this.photo).subscribe(resp => {
        this.loader.hide();
        this.router.navigate(["/image", resp['data']['id']]);
      }, () => this.errorSnackBar());
    } else {
      this.errorSnackBar();
    }
  }

  errorSnackBar() {
    this.snackbar.action({actionText:"Retry",snackText:"There was an error",hideDelay:9999999999}).then(() => this.submit());
    this.loader.hide();
  }

  back() {
    this.router.navigate(["discover"]);
  }

}
