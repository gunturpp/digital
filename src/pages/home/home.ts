import { Component, ElementRef, ViewChild, NgZone, Injectable } from '@angular/core';
import { AlertController, ModalController, App, PopoverController, ToastController, LoadingController, IonicPage,Slides, NavController, NavParams,ViewController, Platform, Content } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers,RequestOptions } from '@angular/http';


import { DataProvider } from '../../providers/data/data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { MenuPage } from '../menu/menu';
import { LoginPage } from '../login/login';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ReviewsDetailPage } from '../reviews-detail/reviews-detail';

let apiURL = 'http://188.166.188.11/';
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
    @ViewChild(Content) content: Content;

    @ViewChild(Slides) slides: Slides;  
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

      
    searchTermProduct: string = '';
    searchTermBike: string = '';
    items: any;
    reviews:any;
    bikes:any;
    products:any;
    rundowns:any;
    x:number= 0;
    slide1:any;
    test:any;
    // for token login
    loading: any;
    isLoggedIn: boolean = false;
    tangkap: any;
    
  constructor( public http: Http, public loadingCtrl: LoadingController,public popoverCtrl:PopoverController, public app:App, public toastCtrl:ToastController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,  public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController, public authService: AuthServiceProvider, public alertCtrl:AlertController,  public dataService: DataProvider) {
        // auth token
        let token = localStorage.getItem('token');
        console.log('token home',token);
        this.tangkap = this.navParams.get('cacad');
        console.log(this.tangkap);


        /*  
        let loading = this.loadingCtrl.create({
            content: 'Tunggu sebentar...'
        });
        loading.present();
       */

        if(token == null) {
          this.isLoggedIn = false;
          this.navCtrl.setRoot(LoginPage);
          this.viewCtrl.dismiss();
        }        

        let headers = new Headers({
         'Authorization': 'Bearer ' + token,
        });
        let options = new RequestOptions({ headers: headers });

        this.http.get(apiURL+'getreviews', options)
        .map(res => this.reviews= res.json())
        .subscribe(reviews => {
            this.reviews = reviews['reviews'];
            console.log('rev',this.reviews);                 
         },
          error => {
            console.log(error); 
            if(error.statusText=="Unauthorized"){
            localStorage.removeItem('token');
            this.authService.logout();      
            this.isLoggedIn = false;
            this.navCtrl.setRoot(LoginPage);
            this.viewCtrl.dismiss();
            localStorage.clear();
            }
        });
        
        this.http.get(apiURL+'getbikes', options)
        .map(res => this.bikes= res.json())
        .subscribe(bikes => {
            this.bikes = bikes['bikes'];
            console.log(this.bikes);
          });

        this.http.get(apiURL+'getproduct', options)
        .map(res => this.products= res.json())
        .subscribe(products => {
            this.products = products['products'];
            console.log(this.products);
          });
        
        
        this.http.get(apiURL+'getevents', options)
        .map(res => this.rundowns= res.json())
        .subscribe(rundowns => {
            this.rundowns = rundowns['rundowns'];
            console.log(this.rundowns.location);
            //loading.dismiss();

          });

  }
<<<<<<< HEAD


    //  slideChanged() {
    // this.slides.scrollTop();
    // // console.log('Current index is', currentIndex);
  // }
  goToLocation(){
=======
  
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
    goToLocation(){
>>>>>>> 84060e337f625b58207091add146b7838cbbc78e
    window.open('https://www.google.co.id/maps/search/margo+city/@-6.3729669,106.8322465,17z/data=!3m1!4b1', '_system')
  }
    ionViewDidLoad(): void {
       //this.products = this.dataService.filterItemsProduct("h");
       this.setFilteredItemsProduct();
       this.setFilteredItemsBikes();
       let loadings = this.loadingCtrl.create({
         content: "Please Wait"
       });
       setTimeout(() => {
         this.goToSlide2();
        }, 3000);
        loadings.present();
        if(this.tangkap!=null){
          this.slides.slideNext(200);
        }
        loadings.dismiss();
    }
    setFilteredItems(){
        this.products = this.dataService.filterItemsProduct(this.searchTermProduct);
    }
    setFilteredItemsProduct() {
        this.products = this.dataService.filterItemsProduct(this.searchTermProduct);
  }

    setFilteredItemsBikes() {
        this.bikes = this.dataService.filterItemsBikes(this.searchTermBike);
    }
    goToSlide1() {
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


//=========================================
filterProduct() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter');

    alert.addInput({
      type: 'radio',
      label: 'All',
      value: '',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Helmet',
      value: 'Helm',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Jacket',
      value: 'jacket',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Glove',
      value: 'glove',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Shoes',
      value: 'shoes',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'T-shirt',
      value: 'T-shirt',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Accessories',
      value: 'Accessories',
      checked: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
          this.searchTermProduct=data;
          console.log(this.searchTermProduct)
          this.setFilteredItemsProduct() 
          this.products = this.dataService.filterItemsProduct(data);
      }
    });
    alert.present();
  }
filterBikes() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter');

    alert.addInput({
      type: 'radio',
      label: 'DUCATI DIAVEL',
      value: 'ducati',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'BIKE A',
      value: 'BIKE A',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'YAMAHA',
      value: 'yamaha',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Honda',
      value: 'honda',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Suzuki',
      value: 'suzuki',
      checked: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
          this.searchTermBike=data;
          console.log(this.searchTermBike)
          this.setFilteredItemsBikes() 
          this.bikes = this.dataService.filterItemsBikes(data);
      }
    });
    alert.present();
  }
    
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
      position: 'top',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
 
//=======================================

}