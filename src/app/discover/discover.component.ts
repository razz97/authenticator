import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Photo } from '../model/photo';

@Component({
  selector: 'ns-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  moduleId: module.id,
})
export class DiscoverComponent implements OnInit {

  constructor(private photoService: PhotoService) { }

  photos: Photo[] = [];

  ngOnInit() {
    this.photoService.getPhotos().subscribe(resp => this.photos = resp['data']);
  }

}
