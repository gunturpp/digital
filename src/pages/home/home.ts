import { Component, ElementRef, ViewChild, NgZone, Injectable } from '@angular/core';
import { AlertController, ModalController, App, ToastController, LoadingController, IonicPage,Slides, NavController, NavParams,ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers,RequestOptions } from '@angular/http';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { MenuPage } from '../menu/menu';
import { LoginPage } from '../login/login';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ReviewsDetailPage } from '../reviews-detail/reviews-detail';

let apiReviews = 'http://188.166.188.11/getreviews';
let apiBikes = 'http://188.166.188.11/getbikes';
// let apiEvents = 'http://188.166.188.11/getevents';
// let apiVloggers = 'http://188.166.188.11/getvloggers';
let apiProduct = 'http://188.166.188.11/getproduct';
let token = localStorage.getItem('token');
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
  products:any;
  
    
    @ViewChild(Slides) slides: Slides;  
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    reviews:any;
    bikes:any;
  
    // for token login
    loading: any;
    isLoggedIn: boolean = false;

    
  constructor( public http: Http, public loadingCtrl: LoadingController, public app:App, public toastCtrl:ToastController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,  public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController, public authService: AuthServiceProvider, public alertCtrl:AlertController) {
        // auth token
        if(localStorage.getItem(token)) {
        this.isLoggedIn = true;

      }        

        let headers = new Headers({
         'Authorization': 'Bearer ' + token,
        });
        let options = new RequestOptions({ headers: headers });

        this.http.get(apiProduct, options)
        .map(res => this.products= res.json())
        .subscribe(products => {
            this.products = products['products'];
            console.log(this.products);
          });
        this.http.get(apiReviews, options)
        .map(res => this.reviews= res.json())
        .subscribe(reviews => {
            this.reviews = reviews['reviews'];
            console.log(this.reviews);
          });
        this.http.get(apiBikes, options)
        .map(res => this.bikes= res.json())
        .subscribe(bikes => {
            this.bikes = bikes['bikes'];
            console.log(this.bikes);
          });


  }
  
     ionViewDidLoad(): void {
        // GET FROM API
        
 
      console.log(token);
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
  goToProductDetail(productName: any) {
    this.navCtrl.push(ProductDetailPage, {
      product: productName,
      name: productName.name
    });
  }
  goToReviewDetail(reviewName: any) {
    this.navCtrl.push(ReviewsDetailPage, {
      review: reviewName,
      name: reviewName.name
    });
  }
  
  
    presentMenu() {
      let modal = this.modalCtrl.create(MenuPage);
      modal.present();
    }


  //--------- logout --------------
   logout() {
   
    let loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar ...'
    });
    localStorage.removeItem('token');
    this.authService.logout();
      loading.present();
      let nav = this.app.getRootNav();
      
      loading.dismiss();
      nav.setRoot(LoginPage);
      this.showAlert("Logout berhasil.")
  }
//=========================================
  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }
    showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  };

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
