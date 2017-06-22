import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
    submitted = false;
    

  constructor(public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    let getProfiles = localStorage.getItem('email');
    console.log(getProfiles);

  }
  
  ionViewDidLoad() {
    let getProfiles = localStorage.getItem('email');
    console.log(getProfiles);
  }

}
