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
let tanggalJson = 'assets/data/tanggal.json';
let bulanJson = 'assets/data/bulan.json';
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
  tanggalpicker:any;
  bulanpicker:any;

  @ViewChild(Slides) slides: Slides;
  gendernya: any;
  value: any;
  valueBirthday: any;
  valuestatus: any;
  valueDomisili: any;
  valueTgl: any;
  valueBln: any;
  valueThn: any;

  searchDomisili: string = '';

  showGender: boolean = false;
  showStatus: boolean = false;
  showLahir: boolean = false;
  showDomisili: boolean = false;
  showTgl: boolean = false;
  showBln: boolean = false;
  showThn: boolean = false;

  dates: { tanggals?: string, bulans?: string, tahuns?: string } = {};
  birthdate: string;
  user: { name?: string, email?: string, gender?: string, password?: string, role?: string, hp?: string, status_kawin?: string, domisili?: string, birthdate?: string } = {};
  submitted = false;
  constructor(public dataService: DataProvider, private genders: GenderPage, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    this.http.get(dataJson)
      .map(res => this.domisili = res.json())
      .subscribe(domisili => {
        this.domisili = domisili['provinsi'];
        console.log(this.domisili);
      });


    this.http.get(tanggalJson)
      .map(res => this.tanggalpicker = res.json())
      .subscribe(tanggalpicker => {
        this.tanggalpicker = tanggalpicker['datepicker'];
        console.log(this.tanggalpicker);
      });

    this.http.get(bulanJson)
      .map(res => this.bulanpicker = res.json())
      .subscribe(bulanpicker => {
        this.bulanpicker = bulanpicker['datepicker'];
        console.log(this.bulanpicker);
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
    this.valueTgl = "1";
    this.valueBln = "Jan";
    this.valueThn = "1945";
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
  functTgl(tanggal) {
    this.valueTgl = tanggal;
    console.log(this.valueTgl)
    this.showTgl = false;
  }
  functBln(bulan) {
    this.valueBln = bulan;
    this.showBln = false;
  }
  functThn(tahun) {
    this.valueThn = tahun;
    this.showThn = false;
  }
  functBorn() {
   this.valueBirthday = this.valueTgl+"/"+this.valueBln+"/"+this.valueThn;
    console.log('value', this.valueBirthday);
    this.showLahir = false;
  }
  functDomisili(city) {
    this.valueDomisili = city;
    this.showDomisili = false;
  }
  presentTgl() {
    let status: boolean = true;
    if (status == true) {
      this.showTgl = true;
      this.showBln = false;
    }
  }
  presentBln() {
    let status: boolean = true;
    if (status == true) {
      this.showBln = true;
      this.showTgl = false;
    }
  }
  presentThn() {
    let status: boolean = true;
    if (status == true) {
      this.showThn = true;
    }
  }
  ionViewDidLoad() {
    this.domisili;
  }
  setFilteredDomisili() {
    this.domisili = this.dataService.filterDomisili(this.searchDomisili);
  }
  getDomisili(ev: any) {
    this.setFilteredDomisili();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
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