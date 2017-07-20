import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from "../register/register";

/**
 * Generated class for the LahirPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-lahir',
  templateUrl: 'lahir.html',
})
export class LahirPage {
  tanggals:string;
  bulans:string;
  tahuns:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LahirPage');
  }

  grabDate(){
    this.navCtrl.push(RegisterPage);
  }
}
