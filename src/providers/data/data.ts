import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../../pages/login/login';
import {  Headers,RequestOptions } from '@angular/http';
import { AuthServiceProvider } from "../auth-service/auth-service";
import { ToastController, LoadingController, NavController, NavParams } from 'ionic-angular';


let apiURL = 'http://188.166.188.11/';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {
  
  itemsProduct:any=[]; // api product
  itemsBikes:any=[]; // api bikes
  constructor(public http: Http, public authService: AuthServiceProvider) {
    let token = localStorage.getItem('token');
                let headers = new Headers({
         'Authorization': 'Bearer ' + token,
        });
        let options = new RequestOptions({ headers: headers });

        this.http.get(apiURL+'getproduct', options)
        .map(res => this.itemsProduct= res.json())
        .subscribe(products => {
            this.itemsProduct = products['products'];
            console.log('pr',this.itemsProduct);           
          },
          error => {
            console.log(error); 
            if(error.statusText=="Unauthorized"){
            localStorage.removeItem('token');
            this.authService.logout();      
            //this.nav.setRoot(LoginPage);
            //tinggal redirect ke login, tapi gw gak bisa
            localStorage.clear();
            }
          });

          
        this.http.get(apiURL+'getbikes', options)
        .map(res => this.itemsBikes= res.json())
        .subscribe(bikes => {
            this.itemsBikes = bikes['bikes'];
            console.log(this.itemsBikes);
          });

 
  }
  filterItemsProduct(searchTerm){ 
        return this.itemsProduct.filter((product) => {
            return product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });      
  }

  filterItemsTypeProduct(searchTerm){ 
        return this.itemsProduct.filter((product) => {
            return product.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });      
  }
  filterItemsBikes(searchTerm){ 
        return this.itemsBikes.filter((bikes) => {
            return bikes.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });      
  }
 
  filterItemsTypeBike(searchTerm){ 
        return this.itemsBikes.filter((bikes) => {
            return bikes.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });      
  }
  

}
