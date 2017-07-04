import { Component } from '@angular/core';
import {NavController, LoadingController, ToastController  } from 'ionic-angular';
import { Http } from '@angular/http';

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
        'Content-Type': 'x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.token,

        
      });
      let input = {
        title: this.feedback.title,
        description: this.feedback.description,
      };

      this.http.post(apiURL+'addfeedback',input, contentHeader).subscribe(data => {
          let response = data.json();
          loading.dismiss();
          if(response.status == true) {
            localStorage.setItem('userReturn',JSON.stringify(response));
  
            this.navCtrl.popToRoot();
            this.showAlert('Selamat Datang ' + response.user.name);

            console.log('statusnya3',response.status);
            localStorage.setItem('token', response .token);
            console.log('cektokenn',localStorage.getItem('token'));

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
