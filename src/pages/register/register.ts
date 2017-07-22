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
import { DataProvider } from "../../providers/data/data";
let dataJson = 'assets/data/data.json';
@Injectable()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [GenderPage]
})
export class RegisterPage {
  products: any;
  gender: any;
  status: any;
  domisili: any;

  @ViewChild(Slides) slides: Slides;
  gendernya: any;
  value: any;
  valueBirthday: any;
  valuestatus: any;
  valueDomisili: any;

  searchDomisili: string = '';

  showGender: boolean = false;
  showStatus: boolean = false;
  showLahir: boolean = false;
  showDomisili: boolean = false;

  dates: { tanggals?: string, bulans?: string,tahuns?: string} ={};
  birthdate: string;
  user: { name?: string, email?: string, gender?: string, password?: string, role?: string, hp?: string, status_kawin?: string, domisili?: string, birthdate?: string } = {};
  submitted = false;
  constructor(public dataService: DataProvider,private genders: GenderPage, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
      this.http.get(dataJson)
        .map(res => this.domisili= res.json())
        .subscribe(domisili => {
            this.domisili = domisili['provinsi'];
            // for(let i=0; i<this.domisili.length;i++){
            // console.log(this.domisili[i]);
            // }
            console.log(this.domisili);

          });
    // this.domisili = this.navParams.data.kota;
    // console.log("kota :" + this.domisili);

    // this.birthdate = this.navParams.get('birthdate');
    // console.log("tgl lahir :" + this.birthdate);

    // this.gender = this.navParams.get('gender');
    // console.log("gender :" + this.gender);

    // this.status = this.navParams.get('status');
    // console.log("status :" + this.status);

    this.value = "PRIA/WANITA";
    this.valuestatus = "STATUS";
    this.valueBirthday = "TGL LAHIR";
    this.valueDomisili = "DOMISILI";
    // if (this.gender != null) {
    //   this.value = this.gender;
    // }

    // if (this.status != null) {
    //   this.valuestatus = this.status;
    // }

    // if (this.valueBirthday != null) {
    //   this.valueBirthday = this.birthdate;
    // }

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
      let contentHeader = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });

      let input = {
        name: this.user.name,
        email: this.user.email,
        gender: this.value,
        status_kawin: this.valuestatus,
        hp: this.user.hp,
        domisili: this.valueDomisili,
        birthdate: this.valueBirthday,
        password: this.user.password,
        role: this.user.role = "user",
      };

      var data = { matric: 21 };
      this.http.post("http://188.166.188.11/signup", input, contentHeader).subscribe(data => {
        loading.dismiss();
        let response = data.json();
        if (response.status == 200) {
          let user = response.data;
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
  functGender(gender) {
    this.value = gender;
    this.showGender = false;
  }
  functNikah(status) {
    this.valuestatus = status;
    this.showStatus = false;
  }
  functBorn() {
    // this.birthdate = this.tanggals + this.bulans + this.tahuns;
    if(this.dates.tahuns != null){
      this.valueBirthday = this.dates.tahuns;
    }
    else {
      this.valueBirthday = 'empty';
    }
    this.showLahir = false;
    // console.log( this.tanggals + this.bulans + this.tahuns);
    console.log('tgl', this.dates.tanggals);
    console.log('bl', this.dates.bulans);
    console.log('th', this.dates.tahuns);
    console.log('value', this.valueBirthday);
  }
  functDomisili(city) {
    this.valueDomisili = city;
    this.showDomisili = false;
  }
  ionViewDidLoad() {
    // if (this.gender != null) {
    //   this.value = this.gender;
    // }
    // if (this.status != null) {
    //   this.valuestatus = this.status;
    // }
    // if (this.status != null) {
    //   this.valueBirthday = this.birthdate;
    // }
  }
      setFilteredDomisili() {
        this.domisili = this.dataService.filterDomisili(this.searchDomisili);
      }
      getDomisili(ev:any){
        this.domisili;
      this.setFilteredDomisili();
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.domisili
      } else {  
        // hide the results when the query is empty
      }
    }
  showError(err: any) {
    err.status == 0 ?
      this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda") :
      this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      // title: 'Confirm purchase',
      // message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Female',
          cssClass: 'cobaa',
          handler: () => {
            this.user.gender = "female";
            console.log(this.user.gender);
          }
        },
        {
          text: 'Male',
          role: 'male',
          handler: () => {
            this.user.gender = "male";
            console.log(this.user.gender);
          }
        }
      ]
    });
    alert.present();
  }
  showAlert(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  back() {
    this.navCtrl.setRoot(LoginPage);
  }

  presentMenuGender() {
    // let modal = this.modalCtrl.create(GenderPage);
    // modal.present();
    let status: boolean = true;
    if (status == true) {
      this.showGender = true;
    }
  }
  presentMenuStatus() {
    // let modal = this.modalCtrl.create(StatusnikahPage);
    // modal.present();
    let status: boolean = true;
    if (status == true) {
      this.showStatus = true;
    }

  }
  presentMenuLahir() {
    // let modal = this.modalCtrl.create(LahirPage);
    // modal.present();
    let status: boolean = true;
    if (status == true) {
      this.showLahir = true;
    }
  }
  presentMenuDomisili() {
    // let modal = this.modalCtrl.create(DomisiliPage);
    // modal.present();
    let status: boolean = true;
    if (status == true) {
      this.showDomisili = true;
    }
  }



}