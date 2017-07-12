import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

 let apiURL = "http://188.166.188.11/signin";
 
 @Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  

  // user: {email?: string, password?: string} = {};
  submitted = false;
  user = { email:'', password:'',status:'0' };
  data: any;
  token:any;
  name:any;
  statusnya:any;
  constructor(public storage:Storage, public viewCtrl: ViewController, public http: Http, public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.token = localStorage.getItem('token');
     if(localStorage.getItem('token')) {
      this.navCtrl.setRoot(HomePage);
     }
     this.statusnya = localStorage.getItem('status');
     console.log(this.statusnya);

  }

   doLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
    loading.present();
      let contentHeader = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
      let input = {
        email: this.user.email,
        password: this.user.password,
        status: this.user.status
      };

      this.http.post(apiURL,input, contentHeader).subscribe(data => {
          let response = data.json();
          loading.dismiss();
          if(response.status == true) {
            localStorage.setItem('userReturn',JSON.stringify(response));
            this.viewCtrl.dismiss();  
            this.navCtrl.push(HomePage);
            this.showAlert('Selamat Datang ' + response.user.name);

            console.log('statusnya3',response.status);
            localStorage.setItem('token', response .token);
            console.log('cektokenn',localStorage.getItem('token'));
            console.log('responya',response.status);
            localStorage.setItem('status', response.status);            
          } 
          else {
            this.showAlert(response.message);
            console.log("password salah");
           
           }
        }, err => {
           loading.dismiss();
           this.showError(err);
           console.log('eerrror', err);
        });

}
  }
    ionViewDidLoad() {
  }



  register() {
    this.navCtrl.push(RegisterPage);
  }
  forgotPassword(){

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