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
   user: {username?: string, name?: string, email?: string, role?:string,phone_number?:string,user_id?:string} = {};
    submitted = false;


  constructor(public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    let x = localStorage.getItem('email');
    console.log(x);
  }

}
