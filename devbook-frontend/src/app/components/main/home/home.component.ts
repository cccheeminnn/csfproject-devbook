import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dogCard = {
    title: "Shiba Inu",
    subtitle: "Dog Breed",
    profileImgUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    content:
      "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. " +
      "A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
  };

  dogArray!:Array<any>;

  constructor(carouselConfig: NgbCarouselConfig) {
    carouselConfig.interval = 0
    carouselConfig.showNavigationIndicators = false;
  }

  ngOnInit(): void {
    this.dogArray = [];
    for (let i = 0; i < 4; i++) {
      this.dogArray.push(this.dogCard)
    }
  }

}
