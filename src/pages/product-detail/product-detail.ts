import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IonicStorageModule } from '@ionic/storage';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product:any;
  x;
  temp = [];

  constructor(public storage: IonicStorageModule, public navCtrl: NavController, public navParams: NavParams) {
     this.product = this.navParams.data.product;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    console.log(this.product);
    console.log('arr', JSON.stringify(localStorage.getItem('order3')));
  }
  // ini fungsi pas save order
  saveToInbox(saveOrder){
    localStorage.setItem('order',JSON.stringify(this.product));
    this.temp.push(this.product);
    
    console.log(this.temp);
    this.x =this.temp;
    localStorage.setItem('order3',(this.x));
    console.log(this.x);
   
  }
  popback(){
    this.navCtrl.popToRoot();
  }

}
