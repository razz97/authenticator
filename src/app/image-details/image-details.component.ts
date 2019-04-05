import { Component, OnInit } from '@angular/core';
import { Photo } from '../model/photo';
import { PhotoService } from '../photo.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-image-details',
  templateUrl: './image-details.component.html',
  moduleId: module.id,
})
export class ImageDetailsComponent implements OnInit {

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  image: Photo = new Photo();

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.photoService.getPhotoInfo(params['id']).subscribe(resp => {
        this.image = resp['data'];
      });
    });
  }

  infoDialog() {
    let options = {
      message: "Author: " + this.image.username + "\nCategory: " + this.image.category +  "\nLocation: "+this.image.location,
      title:"Information", 
      okButtonText: "Done"
    }
    dialogs.alert(options);
  }
}
