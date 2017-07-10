import { Component, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { Slides, Content, ToastController, LoadingController, NavController, NavParams } from 'ionic-angular';
=======
import { ToastController, LoadingController, NavController, NavParams, Slides } from 'ionic-angular';
>>>>>>> 84060e337f625b58207091add146b7838cbbc78e
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { FeedbackPage } from '../feedback/feedback';
import { LoginPage } from '../login/login';
import { InboxPage } from '../inbox/inbox';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { MyprofilePage } from '../myprofile/myprofile';
import { LocationSelectPage } from '../location-select/location-select';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';



@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
<<<<<<< HEAD
    @ViewChild(Slides) slides: Slides;  
    @ViewChild(Content) content: Content;
      scrollToTop() {
      this.content.scrollTo(0,300, 200);
    }

    guntur: HomePage;

  constructor(public loadingCtrl:LoadingController, public toastCtrl:ToastController, public authService:AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  public objek: HomePage;
  gotoSlide2(){
    this.navCtrl.push(HomePage,{'cacad':"cok"});
  }
    //back button
=======
  @ViewChild(Slides) slides: Slides;  
    
  constructor(public loadingCtrl:LoadingController, public toastCtrl:ToastController, public authService:AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {}
   
  //back button
>>>>>>> 84060e337f625b58207091add146b7838cbbc78e
  backToHome(){
    this.navCtrl.setRoot(HomePage);
    
  }
  
  goToSlide1() {
    this.navCtrl.setRoot(HomePage);
  }
  goToSlide2() {
    this.navCtrl.setRoot(HomePage);
  }
  goToSlide3() {
    this.navCtrl.setRoot(HomePage);
  }
  goToSlide4() {
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
    // console.log('ionViewDidLoad MenuPage', this.home.coba);
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