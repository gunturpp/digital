import { Component } from '@angular/core';
import { ToastController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { FeedbackPage } from '../feedback/feedback';
import { LoginPage } from '../login/login';
import { InboxPage } from '../inbox/inbox';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { MyprofilePage } from '../myprofile/myprofile';
import { LocationSelectPage } from '../location-select/location-select';



@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public loadingCtrl:LoadingController, public toastCtrl:ToastController, public authService:AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {}
   // simbol button
   
  symbols = [
    {
      image :"assets/img/Menu-icon-Home-Event.png",
      text : "EVENT"
    },
    {
      image :"assets/img/Menu-icon-Best-Deals.png",
      text : "BEST DEALS"
    },

    {
      image :"assets/img/Menu-icon-Bikes.png",
      text : "BIKES"
    },
    {
      image :"assets/img/Menu-icon-Reviews.png",
      text : "REVIEWS"
    },
    {
      image :"assets/img/Menu-icon-Direction.png",
      text : "DIRECTION",
      link: "openMap()"
    }

  ];


  //back button
  backToHome(){
    this.navCtrl.setRoot(HomePage);
  }
  openMap(){
    this.navCtrl.setRoot(LocationSelectPage);
  }
  profilePage(){
    this.navCtrl.push(MyprofilePage);
  }
  inboxPage(){
    this.navCtrl.push(InboxPage);
  }
  aboutPage(){
    this.navCtrl.push(AboutPage);
  }
  settingPage(){
    this.navCtrl.push(SettingPage);
  }
  feedbackPage(){
    this.navCtrl.push(FeedbackPage);
  }
  // navigation

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  //--------- logout --------------
   logout() {
   
    let loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar ...'
    });
    localStorage.removeItem('token');
    this.authService.logout();
      loading.present();
      
      loading.dismiss();
      this.showAlert("Logout berhasil.");
      this.navCtrl.setRoot(LoginPage);

      console.log('tokenul' ,localStorage.getItem('token'));
      localStorage.clear();
      console.log('profil',localStorage.getItem('userReturn'));
      
  }
      showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  };
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}