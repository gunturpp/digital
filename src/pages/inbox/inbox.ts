import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions } from '@angular/http';

let apiURL = 'http://188.166.188.11/';


@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
inboxs:any;  
  constructor(public http:Http,public navCtrl: NavController, public navParams: NavParams) {
        let token = localStorage.getItem('token');
        console.log('token home',token);

        let headers = new Headers({
         'Authorization': 'Bearer ' + token,
        });
        let options = new RequestOptions({ headers: headers });

        this.http.get(apiURL+'getinbox', options)
        .map(res => this.inboxs= res.json())
        .subscribe(inboxs => {
            this.inboxs = inboxs['inbox'];
            console.log(this.inboxs);
       
          });


  }


  ionViewDidLoad() {

  }

}
