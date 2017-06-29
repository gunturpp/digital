import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

let profiles = JSON.parse(localStorage.getItem('userReturn'));

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
    submitted = false;
    profile = profiles.user;

  constructor(public storage: Storage,public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log( this.profile);
    
  }
  changePassword(){
    console.log("change password");
  }

}
