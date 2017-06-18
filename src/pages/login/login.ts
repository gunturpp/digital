import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Http } from '@angular/http';

 let apiURL = "http://localhost:8000/signin";
 @Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  

  user: {email?: string, password?: string} = {};
  submitted = false;
  // user = { email:'drikdoank@gmail.com', password:'didok49' };
  data: any;

  constructor(public http: Http, public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

   doLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
    loading.present();
     
      let input = JSON.stringify({
        email: this.user.email,
        password: this.user.password
      });
        this.http.post(apiURL,input).subscribe(data => {
           let response = data.json();
          //  loading.dismiss();
           if(response.status == 200) {
             let user=response.data;
             this.authService.login(user.email,user.name,user.domisili,user.hp,user.status,user.role,user.birthdate,user.gender);
            //  this.userDataProvider.login(user.user_id,user.username,user.user_status,user.name,user.phone_number,user.email);
             console.log(user); 
             this.navCtrl.push(HomePage);


           } else {
             this.showAlert(response.message);
             console.log(response);
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