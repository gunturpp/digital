import { Component } from '@angular/core';
import { LoadingController,ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {IonicStorageModule } from '@ionic/storage';
import { Http, Headers,RequestOptions } from '@angular/http';

let apiURL = "http://188.166.188.11/addorder";
///let apiURL = "http://localhost:8000/addorder"

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product:any;
  token = localStorage.getItem('token');
  contentHeader = new Headers({
      "Authorization" : "Bearer " + this.token
  });

  submitted = false;
  constructor(public http:Http,public storage: IonicStorageModule, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    this.token = localStorage.getItem('token');
    console.log('token product',this.token);
    this.product = this.navParams.data.product;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad2', this.token);

  }
  // ini fungsi pas save order
  saveToInbox(saveOrder){
    this.submitted = true;
    let head = new Headers({
        "Authorization" : "Bearer " + this.token,
        "Content-Type": "application/json"
    });

    let options = new RequestOptions({ headers: head });
    let profiles = JSON.parse(localStorage.getItem('userReturn'));

    let input = {
      "id_product": this.product.id,
      "amount": this.product.price,
      "qty": '1',
      "address": profiles.user.domisili,
      "note":this.product.name
    };

    let loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar...'
    });    
    
    this.http.post(apiURL,input, options).subscribe(data => {
        let response = data.json();
        if(response.status == true) {
          this.showAlert('Orderan anda sudah kami terima, silahkan cek inbox');
          this.popback();

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
    this.popback();
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
