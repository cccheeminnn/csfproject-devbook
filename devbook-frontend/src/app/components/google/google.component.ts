import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit, OnDestroy {

  searchLocation!: string;
  center!: google.maps.LatLngLiteral;
  markers!: Array<google.maps.Marker>;
  markerOption!: google.maps.MarkerOptions;

  constructor(
    private previewSvc: PreviewService
  ) { }
  ngOnDestroy(): void {
    // console.log('google comp destroyed')
    this.previewSvc.searchLocation = '';
  }

  ngOnInit(): void {
    this.searchLocation = this.previewSvc.searchLocation;

    this.markers = new Array;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { address: this.searchLocation }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        console.info('location geocoded')
        this.center = {
          lat: results![0].geometry.location.lat(),
          lng: results![0].geometry.location.lng()
        }
        results?.forEach(geocoderResult => {
          let resultLatLng: google.maps.LatLngLiteral = {
            lat: geocoderResult.geometry.location.lat(),
            lng: geocoderResult.geometry.location.lng()
          };
          // console.info('results.forEach', resultLatLng.lat)
          // console.info('results.forEach', resultLatLng.lng)
          let marker = new google.maps.Marker
          marker.setPosition(resultLatLng)
          this.markers.push(marker)
        })
      } else {
        console.error('couldnt geocode location')
      }
    })
  }
}
