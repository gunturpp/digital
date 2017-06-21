import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  
  user: {name?: string, email?: string, gender?: string, password?: string, role?:string,hp?:string,status_kawin?:string,domisili?:string,birthdate?:string} = {};
  submitted = false;
  constructor(public alertCtrl: AlertController, public http: Http,public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

   onSignup(form: NgForm) {
      this.submitted = true;
      let loading = this.loadingCtrl.create({
          content: 'Tunggu sebentar...'
      });

      if (form.valid) {
        loading.present();
        let input = JSON.stringify({
          name: this.user.name,
          email: this.user.email,
          gender: this.user.gender,
          status_kawin: this.user.status_kawin,
          hp: this.user.hp,
          domisili: this.user.domisili,
          birthdate: this.user.birthdate,
          password: this.user.password,
          role: this.user.role="user",
        });
        this.http.post("http://localhost:8000/signup",input).subscribe(data => {
              loading.dismiss();
              let response = data.json();
              if(response.status == 200){
                let user=response.data;
                this.authService.login(user.email,user.name,user.domisili,user.hp,user.status,user.role,user.birthdate,user.gender);
                this.navCtrl.setRoot(LoginPage);
                console.log(this.user.gender);

              }
              this.showAlert(response.message);
        }, err => {
           loading.dismiss();
           this.showError(err);
                           console.log(this.user.gender);
                           console.log(this.user.hp);
                           console.log(this.user.birthdate);
                           console.log(this.user.status_kawin);
                           console.log(this.user.password);

        });
    }
  }
  showError(err: any){
    err.status==0?
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
}
  back(){
    this.navCtrl.setRoot(LoginPage);
  }


}