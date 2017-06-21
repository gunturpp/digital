import { Component, ElementRef, ViewChild, NgZone, Injectable } from '@angular/core';
import { ModalController, App, ToastController, LoadingController, IonicPage,Slides, NavController, NavParams,ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { MenuPage } from '../menu/menu';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})

export class HomePage {
  
    
    @ViewChild(Slides) slides: Slides;  
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
    // for token login
    loading: any;
    isLoggedIn: boolean = false;

  constructor(public loadingCtrl: LoadingController, public app:App, public toastCtrl:ToastController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,  public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
        this.searchDisabled = true;
        this.saveDisabled = true;
        
        // auth token
        // if(localStorage.getItem("token")) {
        // this.isLoggedIn = true;
        // }        
  }
  
     ionViewDidLoad(): void {
 
       let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
 
        }); 
    }
    
    public goToSlide1() {
    this.slides.slideTo(0, 200);
    }
    goToSlide2() {
    this.slides.slideTo(1, 200);
    }
    goToSlide3() {
    this.slides.slideTo(2, 200);
    }
    goToSlide4() {
    this.slides.slideTo(3, 200);
    }
    goToSlide5() {
    this.slides.slideTo(4, 200);
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
  
    presentMenu() {
      let modal = this.modalCtrl.create(MenuPage);
      modal.present();
    }


  reviews = [
    {
          image: "assets/img/Bikes-image-a.jpg",
          image2: "assets/img/Bikes-image-a.jpg",
          image3: "assets/img/Bikes-image-a.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    },
    {
          image: "assets/img/Bikes-image-a.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    },
        {
          image: "assets/img/Bikes-image-a.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    },
    {
          image: "assets/img/Bikes-image-a.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
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


  //--------- logout --------------
   logout() {
    this.autocompleteService.logout().then((result) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
//=======================================

}
