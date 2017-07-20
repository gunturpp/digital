import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from "../register/register";


@Component({
  selector: 'page-statusnikah',
  templateUrl: 'statusnikah.html',
})
export class StatusnikahPage {
  value: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusnikahPage');
  }

  
    functNikah(){
    this.value = 'SINGLE';
    console.log(this.value);
    this.navCtrl.push(RegisterPage,{
      status: this.value})
    return this.value;
  }
  functNikah2(){
    this.value = 'MARRIED';
    console.log(this.value);
    
    this.navCtrl.push(RegisterPage,{
      status: this.value});

    return this.value;

  }

}
