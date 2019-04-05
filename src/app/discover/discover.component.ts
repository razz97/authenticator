import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Photo } from '../model/photo';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';

@Component({
  selector: 'ns-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  moduleId: module.id,
})
export class DiscoverComponent implements OnInit {

  constructor(private photoService: PhotoService) { }


  @ViewChild("collection") collection: ElementRef;
  @ViewChild("dd") dropdown: ElementRef;
  photos: Photo[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.getAllPhotos();
    this.photoService.getCategories().subscribe(resp => {
      this.categories = resp['data'];
      this.categories.unshift("All categories");
    });
  }

  getAllPhotos() {
    this.photoService.getPhotos().subscribe(resp => {
      this.photos = resp['data']; 
      this.collection.nativeElement.refresh();
      this.dropdown.nativeElement.selectedIndex = 0;
    });
  }

  getFilteredPhotos(category: string) {
    this.photoService.getPhotosByCategory(category)
    .subscribe(resp => {
      this.photos = resp['data']; 
      this.collection.nativeElement.refresh();
    });
  }

  onSelectCategory(args: SelectedIndexChangedEventData) {
    args.newIndex === 0 
      ? this.getAllPhotos() 
      : this.getFilteredPhotos(this.categories[args.newIndex]);
  }

}
