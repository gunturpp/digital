import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the InboxPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
count:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    //ini mau gua get, di inbox.ts
    let inboxOrderan = JSON.parse(localStorage.getItem('order'));

    console.log(inboxOrderan);
  }


  ionViewDidLoad() {

  }

}
