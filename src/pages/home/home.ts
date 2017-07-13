import { Component, ElementRef, ViewChild, NgZone, Injectable } from '@angular/core';
import {  AlertController, ModalController, App, PopoverController, ToastController, LoadingController, IonicPage,Slides, NavController, NavParams,ViewController, Platform, Content } from 'ionic-angular';
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

    showList: boolean = false;
    searchTermProduct: string = '';
    searchTermTypeProduct: string = '';
    searchTermBike: string = '';
    searchTermTypeBike: string = '';
    items:any;
    reviews:any;
    bikes:any;
    products:any;
    rundowns:any;
    date;
    x:number= 0;
    test:any;
    // for token login
    loading: any;
    isLoggedIn: boolean = false;
    slideno: any;
    menu:MenuPage;

  constructor(public http: Http, public loadingCtrl: LoadingController,public popoverCtrl:PopoverController, public app:App, public toastCtrl:ToastController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,  public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController, public authService: AuthServiceProvider, public alertCtrl:AlertController,  public dataService: DataProvider) {
        // auth token
        let token = localStorage.getItem('token');
        console.log('token home',token);
        this.slideno = this.navParams.get('slide');
        console.log("slide :"+this.slideno);
    
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
            this.date = this.rundowns[0].created_at;
            console.log(this.rundowns.location);
            //loading.dismiss();

          });

  }

      public CValue:String;
      onChange(CValue) {
        this.searchTermBike=CValue;
        console.log('JENISBIKES:',this.searchTermBike)
        this.setFilteredItemsBikes() 
      }
    
      public dValue:String;
      onProductChange(dValue) {
        this.searchTermTypeProduct = dValue;
        console.log('JENISPRODUCT:',this.searchTermTypeProduct)
        this.setFilteredItemsTypeProduct() 
      }

    slideChanged() {
      let currentIndex = this.slides.getActiveIndex();
      this.slides.slideTo(currentIndex);
      console.log('Current index is', currentIndex);
    }
  // goToLocation(){
  //   window.open('https://www.google.co.id/maps/search/margo+city/@-6.3729669,106.8322465,17z/data=!3m1!4b1', '_system')
  // }
    ionViewDidLoad(): void {
       this.setFilteredItemsProduct();
       this.setFilteredItemsBikes();
    }
    
    ionViewDidEnter():void{
        if(typeof (this.slideno)==undefined){
        }else {
            this.slides.slideTo(this.slideno);
        } 
    }
    getItemsForProduct(ev:any){
      this.setFilteredItems();
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        // Filter the items
      
        // Show the results
        this.showList = true;
      } else {  
        // hide the results when the query is empty
        this.showList = false;
      }
    }
    getItemsForBike(ev:any){
      this.setFilteredItemsBike();
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        // Filter the items
      
        // Show the results
        this.showList = true;
      } else {  
        // hide the results when the query is empty
        this.showList = false;
      }
    }

    selectProduct(type){
      this.searchTermProduct = type;
      this.setFilteredItems();
      this.showList = false;
      console.log(type);
     }
     selectBike(type){
      this.searchTermBike = type;
      this.setFilteredItemsBike();
      console.log(type);
      this.showList = false;
     }
    setFilteredItems(){
        this.products = this.dataService.filterItemsProduct(this.searchTermProduct);
    }
    setFilteredItemsProduct() {
        this.products = this.dataService.filterItemsProduct(this.searchTermProduct);
    }
    setFilteredItemsTypeProduct() {
        this.products = this.dataService.filterItemsTypeProduct(this.searchTermTypeProduct);
    }
    setFilteredItemsBike(){
        this.bikes = this.dataService.filterItemsBikes(this.searchTermBike);
    }
    
    setFilteredItemsBikes() {
        this.bikes = this.dataService.filterItemsBikes(this.searchTermBike);
    }
    setFilteredItemsTypeBike() {
        this.bikes = this.dataService.filterItemsTypeBike(this.searchTermTypeBike);
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
// filterProduct() {
//     let alert = this.alertCtrl.create();
//     alert.setTitle('Filter');

//     alert.addInput({
//       type: 'radio',
//       label: 'All',
//       value: '',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'Helmet',
//       value: 'Helm',
//       checked: true
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'Jacket',
//       value: 'jacket',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'Glove',
//       value: 'glove',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'Shoes',
//       value: 'shoes',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'T-shirt',
//       value: 'T-shirt',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'Accessories',
//       value: 'Accessories',
//       checked: false
//     });
//     alert.addButton('Cancel');
//     alert.addButton({
//       text: 'OK',
//       handler: data => {
//           this.searchTermProduct=data;
//           console.log(this.searchTermProduct)
//           this.setFilteredItemsProduct() 
//           this.products = this.dataService.filterItemsProduct(data);
//       }
//     });
//     alert.present();
//   }
// filterBikes() {
//     let alert = this.alertCtrl.create();
//     alert.setTitle('Filter');

//     alert.addInput({
//       type: 'radio',
//       label: 'DUCATI DIAVEL',
//       value: 'ducati',
//       checked: true
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'BIKE A',
//       value: 'BIKE A',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'YAMAHA',
//       value: 'yamaha',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'Honda',
//       value: 'honda',
//       checked: false
//     });
//     alert.addInput({
//       type: 'radio',
//       label: 'Suzuki',
//       value: 'suzuki',
//       checked: false
//     });
//     alert.addButton('Cancel');
//     alert.addButton({
//       text: 'OK',
//       handler: data => {
//           this.searchTermBike=data;
//           console.log(this.searchTermBike)
//           this.setFilteredItemsBikes() 
//           this.bikes = this.dataService.filterItemsBikes(data);
//       }
//     });
//     alert.present();
//   }
    
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