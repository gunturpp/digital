import { NavController, Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
// import { GoogleMaps } from '../../providers/googlemaps';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { HomePage } from '../home/home';
declare var google: any;

@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelectPage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    latitude: number;
    longitude: number;
    autocompleteService: any;
    placesService: any;
    query: string = '';
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    locations: any;  
 
    constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
        this.searchDisabled = true;
        this.saveDisabled = true;

        this.locations = JSON.parse(localStorage.getItem('koordinat'));
    }
    backButton(){
        this.navCtrl.setRoot(HomePage);
    }
    directPlace(){
        console.log('a');
    }
    ionViewDidLoad(): void {
        console.log('spbu',this.maps.spbu);
        console.log('spbu2', JSON.parse(localStorage.getItem('koordinat')));
  
          let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
        }); 
    }
 
    searchPlace(){
 
        this.saveDisabled = true;
 
        if(this.query.length > 0 && !this.searchDisabled) {
 
            let config = {
                types: ['geocode'],
                input: this.query
            }
 
            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
 
                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
 
                    this.places = [];
 
                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                    });
                }
 
            });
 
        } else {
            this.places = [];
        }
 
    }
 
 
    close(){
        this.viewCtrl.dismiss();
    }   

}