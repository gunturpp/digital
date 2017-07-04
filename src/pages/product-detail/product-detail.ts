import { Component } from '@angular/core';
import { LoadingController,ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {IonicStorageModule } from '@ionic/storage';
import { Http } from '@angular/http';

let apiURL = "http://188.166.188.11/addorder";

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product:any;
  token; 
  contentHeader;

  submitted = false;
  constructor(public http:Http,public storage: IonicStorageModule, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    
    this.token = localStorage.getItem('token');
    this.product = this.navParams.data.product;
    this.contentHeader = new Headers({
        "Authorization" : "Bearer" + this.token
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad', this.token);

  }
  // ini fungsi pas save order
  saveToInbox(saveOrder){
    this.submitted = true;
    let input =  JSON.stringify({
      id_product: this.product.promotion,
      amount: this.product.price,
      qty: '1',
      address: 'null',
      note:this.product.name
    });
    let loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar...'
    });    this.http.post(apiURL,input, this.contentHeader).subscribe(data => {
        let response = data.json();
        if(response.status == true) {
          this.showAlert('Orderan anda sudah kami terima, silahkan cek inbox');

        } 
        else {
          this.showAlert(response.message);
          console.log("password salah");
          
          }
      }, err => {
          loading.dismiss();
          this.showError(err);
      });

  }
   showError(err: any){
    err.status==0?
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000,
      position:'middle'
    });
    toast.present();
  };

  popback(){
    this.navCtrl.popToRoot();
  }

}
