import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FeedbackPage } from '../feedback/feedback';
import { InboxPage } from '../inbox/inbox';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { MyprofilePage } from '../myprofile/myprofile';


/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
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
      text : "DIRECTION"
    }

  ];


  //back button
  backToHome(){
    this.navCtrl.setRoot(HomePage);
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

}