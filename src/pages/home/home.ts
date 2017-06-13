import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
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
    location: any;  


  constructor(public navCtrl: NavController, public navParams: NavParams,  public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
        this.searchDisabled = true;
        this.saveDisabled = true;
        
        
  }
  reviews = [
    {
      image: "assets/img/Bikes-image-a.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
      image2: "assets/img/Bikes-image-b.jpg",
    }
  ]
  bikes = [
    {
      image: "assets/img/Bikes-image-a.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
      image2: "assets/img/Bikes-image-b.jpg",
    }
  ];
  cards = [
    {
      image: "assets/img/Best-Deals-Helmet-1.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
    {
      image: "assets/img/Best-Deals-Helmet-2.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
    {
      image: "assets/img/Best-Deals-Helmet-3.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
    {
      image: "assets/img/Best-Deals-Helmet-4.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
    {
      image: "assets/img/Best-Deals-Helmet-5.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
    {
      image: "assets/img/Best-Deals-Helmet-6.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
    {
      image: "assets/img/Best-Deals-Helmet-6.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
    {
      image: "assets/img/Best-Deals-Helmet-6.jpg",
      merk : "Nolan 1",
      harga : "Rp 100.000",
    },
   
  ];
     ionViewDidLoad(): void {
 
       let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
 
        }); 
    }
 
    selectPlace(place){
 
        this.places = [];
 
        let location = {
            lat: null,
            lng: null,
            name: place.name
        };
 
        this.placesService.getDetails({placeId: place.place_id}, (details) => {
 
            this.zone.run(() => {
 
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;
 
                this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 
 
                this.location = location;
 
            });
 
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
 
    save(){
        this.viewCtrl.dismiss(this.location);
    }
 
    close(){
        this.viewCtrl.dismiss();
    }
  moreInfo() {
    console.log('ionViewDidLoad HomePage');
  }


}
