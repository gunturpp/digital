import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home-popover.html',
  
})
export class PopoverPage {
    helm:any;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,

  ) { }
  wow(){
      this.helm = 'helm';
      console.log(this.helm);
  }
  wow2(){
      this.helm = 'helm';
      console.log(this.helm);
  }
  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}