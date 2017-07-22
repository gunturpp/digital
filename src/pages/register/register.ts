import { Injectable, Component, ViewChild } from '@angular/core';
import { ModalController, AlertController, NavController, NavParams, LoadingController, ToastController, Slides } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { GenderPage } from "../gender/gender";
import { StatusnikahPage } from "../statusnikah/statusnikah";
import { LahirPage } from "../lahir/lahir";
import { DomisiliPage } from "../domisili/domisili";

@Injectable()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [GenderPage]
})
export class RegisterPage {  
gender: any;
status: any;
domisili: any;
birthdate: any;

  @ViewChild(Slides) slides: Slides;
  gendernya:any;
  value:any;
  valuebirthdate:any;
  valuestatus:any;

  
  user: {name?: string, email?: string, gender?: string, password?: string, role?:string,hp?:string,status_kawin?:string,domisili?:string,birthdate?:string} = {};
  submitted = false;
  constructor(private genders : GenderPage,public modalCtrl:ModalController, public alertCtrl: AlertController, public http: Http,public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

      this.domisili = this.navParams.data.kota;
      console.log("kota :"+this.domisili);

      this.birthdate = this.navParams.get('birthdate');
      console.log("tgl lahir :"+this.birthdate);

      this.gender= this.navParams.get('gender');
      console.log("gender :"+this.gender);

      this.status= this.navParams.get('status');
      console.log("status :"+this.status);

      this.value= "PRIA/WANITA";
      this.valuestatus= "STATUS";
      
      if(this.gender != null){
        this.value= this.gender;
      }

      if(this.status != null){
        this.valuestatus= this.status;
      }
      
      if(this.valuebirthdate != null){
        this.valuebirthdate= this.birthdate;
      }

  }

    goToSlide1() {
    this.slides.slideTo(1, 200);
    }
    goToSlide0() {
    this.slides.slideTo(0, 200);
    }
    backButton() {
      this.navCtrl.push(LoginPage);
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
          gender: this.gender,
          status_kawin: this.user.status_kawin,
          hp: this.user.hp,
          domisili: this.user.domisili,
          birthdate: this.user.birthdate,
          password: this.user.password,
          role: this.user.role="user",
        };

        var data = {matric:21};
        this.http.post("http://188.166.188.11/signup", input, contentHeader).subscribe(data => {
              loading.dismiss();
              let response = data.json();
              if(response.status == 200){
                let user=response.data;
                // this.authService.login(user.email,user.name,user.domisili,user.hp,user.status,user.role,user.birthdate,user.gender);
                    // this.navCtrl.push(LoginPage);

              }
              this.showAlert(response.message);
              this.navCtrl.push(LoginPage);

              console.log(input);
        }, err => {
           loading.dismiss();
           this.showError(err);
        });
    }
  }
  ionViewDidLoad(){
    if(this.gender != null){
      this.value= this.gender;
    }
     if(this.status != null){
      this.valuestatus= this.status;
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

  presentMenuGender() {
      let modal = this.modalCtrl.create(GenderPage);
      modal.present();
    }
  presentMenuStatus() {
      let modal = this.modalCtrl.create(StatusnikahPage);
      modal.present();
    }
  presentMenuLahir() {
      let modal = this.modalCtrl.create(LahirPage);
      modal.present();
    }
  presentMenuDomisili() {
      let modal = this.modalCtrl.create(DomisiliPage);
      modal.present();
    }
  


}