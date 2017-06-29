import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthServiceProvider {
  HAS_LOGGED_IN = 'hasLoggedIn';
  public loginState = false;
  public token;
  public ids;
  public input: string;
  public jwt: any;
  public out;
  constructor(public http: Http,public events: Events, public storage:Storage) {}

  // login(data) {
  //   return new Promise((resolve, reject) => {
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');

  //       this.http.post(apiUrl+'login', JSON.stringify(data))
  //         .subscribe(res => {
  //           resolve(res.json());
  //         }, (err) => {
  //           reject(err);
  //         });
  //   });
  // }
  setProfile(email,name,domisili) {
    localStorage.setItem('email',email);    
    localStorage.setItem('name',name);    
    localStorage.setItem('domisili',domisili);    
  }
  
  getProfile(email, name){
    
    localStorage.get('email');    
    localStorage.get('name');    

  }
  
  getProf(name,email,domisili,gender,hp,status,birthdate,role,token) {
     this.storage.get(email).then((val) => {
    console.log('Your age is', val);
  });
  }
   login(email,token,name) {
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.storage.set('name', name);
      this.storage.set('email', email);
      // this.storage.set('domisili',domisili);
      // this.storage.set('gender',gender);
      // this.storage.set('hp',hp);
      // this.storage.set('status',status);
      // this.storage.set('birthdate',birthdate);
      // this.storage.set('role',role);
      this.events.publish('user:login');
      this.loginState = true;
  }    
    signup(email) {
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.storage.set('email',email);
      this.events.publish('user:signup');
    }
    logout() {
      
      this.storage.remove(this.HAS_LOGGED_IN);
      this.storage.remove('name');
      this.storage.remove('email');
      this.storage.remove('domisili');
      this.storage.remove('gender');
      this.storage.remove('hp');
      this.storage.remove('token');
      this.storage.remove('status');
      this.storage.remove('birthdate');
      this.storage.remove('role');
      this.events.publish('user:logout');
      this.loginState = false;
      // location.reload();
    }
    

}