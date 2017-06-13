import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
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
  map: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,  public geolocation: Geolocation) {
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
  ionViewDidLoad() {
     this.loadMap();
  }
   loadMap(){
 
 this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
  
  }
  moreInfo() {
    console.log('ionViewDidLoad HomePage');
  }


}
