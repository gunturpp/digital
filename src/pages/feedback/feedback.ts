import { Component } from '@angular/core';
import {NavController, LoadingController, ToastController  } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';

 let apiURL = "http://188.166.188.11/";

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  feedback = { title:'', description:''};
  submitted:boolean = false;
  token = localStorage.getItem('token');
  constructor(public http:Http,public navCtrl: NavController, public loadingCtrl:LoadingController, public toastCtrl:ToastController) {

  }

  sendFeedback(){
        this.submitted = true;
    let loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar...'
    });

    loading.present();
      let contentHeader = new Headers({
        "Authorization" : "Bearer " + this.token,
        "Content-Type": "application/json"        
      });
      let options = new RequestOptions({ headers: contentHeader });

      let input = {
        title: this.feedback.title,
        description: this.feedback.description,
      };

      this.http.post(apiURL+'addfeedback',input, options).subscribe(data => {
          let response = data.json();
          loading.dismiss();
          if(response.status == true) {
            alert("Feedback berhasil dikirim");
            this.navCtrl.popToRoot();

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
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  popTo(){
    this.navCtrl.pop();
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
}
