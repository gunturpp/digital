import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController, ToastController, Slides } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild(Slides) slides: Slides;  

  user: {name?: string, email?: string, gender?: string, password?: string, role?:string,hp?:string,status_kawin?:string,domisili?:string,birthdate?:string} = {};
  submitted = false;
  constructor(public alertCtrl: AlertController, public http: Http,public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

    goToSlide1() {
    this.slides.slideTo(1, 200);
    }

   onSignup(form: NgForm) {
      this.submitted = true;
      let loading = this.loadingCtrl.create({
          content: 'Tunggu sebentar...'
      });

      if (form.valid) {
        loading.present();
        let contentHeader = new Headers({"Content-Type": "application/x-www-form-urlencoded"});

        let input = {
          name: this.user.name,
          email: this.user.email,
          gender: this.user.gender,
          status_kawin: this.user.status_kawin,
          hp: this.user.hp,
          domisili: this.user.domisili,
          birthdate: this.user.birthdate,
          password: this.user.password,
          role: this.user.role="user",
        };
        this.navCtrl.setRoot(LoginPage);

        var data = {matric:21};
        this.http.post("http://188.166.188.11/signup", input, contentHeader).subscribe(data => {
              loading.dismiss();
              let response = data.json();
              if(response.status == 200){
                let user=response.data;
                // this.authService.login(user.email,user.name,user.domisili,user.hp,user.status,user.role,user.birthdate,user.gender);
                    this.navCtrl.setRoot(LoginPage);

              }
              this.showAlert(response.message);
        }, err => {
           loading.dismiss();
           this.showError(err);
        });
    }
  }
  showError(err: any){
    err.status==0?
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  presentConfirm() {
  let alert = this.alertCtrl.create({
    // title: 'Confirm purchase',
    // message: 'Do you want to buy this book?',
    buttons: [
      {
        text: 'Female',
        cssClass: 'cobaa' ,
        handler: () => {
          this.user.gender ="female";
          console.log(this.user.gender);
        }
      },
      {
        text: 'Male',
        role: 'male',
        handler: () => {
          this.user.gender ="male";
          console.log(this.user.gender);
        }
      }
    ]
  });
  alert.present();
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