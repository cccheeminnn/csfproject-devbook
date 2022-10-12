import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../../services/preview.service';
import { FormGroup } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  cardPreview = true;

  formGrp!: FormGroup;

  image01Src: File | string = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/ef3-placeholder-image.jpg';
  image01Caption = '';
  image02Src: File | string = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/ef3-placeholder-image.jpg';
  image02Caption = '';
  image03Src: File | string = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/ef3-placeholder-image.jpg';
  image03Caption = '';
  imageCaption!:string;

  profilePhoto: File | string = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/profile-placeholder.jpg';

  constructor(
    private previewSvc: PreviewService,
    carouselConfig: NgbCarouselConfig) {
    carouselConfig.interval = 0
    carouselConfig.showNavigationIndicators = false;
  }

  ngOnInit(): void {
    this.formGrp = this.previewSvc.formGrp;
    if (this.previewSvc.file01 != null) {
      this.image01Src = this.previewSvc.file01;
      this.image01Caption = this.formGrp.value['file01Description'];
    }
    if (this.previewSvc.file02 != null) {
      this.image02Src = this.previewSvc.file02;
      this.image02Caption = this.formGrp.value['file02Description'];
    }
    if (this.previewSvc.file03 != null) {
      this.image03Src = this.previewSvc.file03;
      this.image03Caption = this.formGrp.value['file03Description'];
    }
    this.imageCaption = this.image01Caption;

    if (this.previewSvc.profilePhoto != null) {
      this.profilePhoto = this.previewSvc.profilePhoto;
    }

  }

  nextPreview() {
    this.cardPreview = false;
  }

  previousPreview() {
    this.cardPreview = true;
  }

  // // for carousel captions changing
  // listenToSlid(event:NgbSingleSlideEvent){
  //   if (event.source == 'arrowRight') {
  //     if (this.imageCaption.match(this.image01Caption)) {
  //       this.imageCaption = this.image02Caption;
  //     } else if (this.imageCaption.match(this.image02Caption)) {
  //       this.imageCaption = this.image03Caption;
  //     } else {
  //       this.imageCaption = this.image01Caption;
  //     }
  //   } else if (event.source == 'arrowLeft') {
  //     if (this.imageCaption.match(this.image01Caption)) {
  //       this.imageCaption = this.image03Caption;
  //     } else if (this.imageCaption.match(this.image02Caption)) {
  //       this.imageCaption = this.image01Caption;
  //     } else {
  //       this.imageCaption = this.image02Caption;
  //     }
  //   }
  // }

}