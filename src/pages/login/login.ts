import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
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
  user = { email:'drikdoank@gmail.com', password:'didok49',status:'0' };
  data: any;
  token:any;
  constructor(public storage:Storage, public http: Http, public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    
     if(localStorage.getItem('token')) {
      this.navCtrl.setRoot(HomePage);
      
 }

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
          this.navCtrl.push(HomePage);
          this.showAlert('Selamat Datang.');

          if(response.status == 200) {
     
            let user=response.data;
            this.authService.login(user.email,response.token);
            localStorage.setItem('email',JSON.stringify(user));
            this.storage.set('email',user.email);
             


           } else {
            console.log(this.user,'oooo');
            localStorage.setItem('email',this.user.email);
            // localStorage.setItem('password',this.user.password);
            let wew2 = localStorage.getItem('email');
            let wew3 = localStorage.getItem('password');
            console.log('www',wew2);             
            console.log('www',wew3);             
            this.showAlert(response.message);
            let saveToken = response.token;
            localStorage.setItem('token',saveToken);
            console.log('proff',this.user);
           }
        }, err => {
           loading.dismiss();
           this.showError(err);

        });

}
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
      duration: 3000
    });
    toast.present();
  };
}