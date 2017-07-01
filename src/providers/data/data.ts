import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {  Headers,RequestOptions } from '@angular/http';


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
  constructor(public http: Http) {
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
  filterItemsBikes(searchTerm){ 
        return this.itemsBikes.filter((bikes) => {
            return bikes.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });      
  }
 
  

}
