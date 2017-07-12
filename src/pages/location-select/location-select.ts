import { LoadingController, NavController, Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { MenuPage } from '../menu/menu';
declare var google: any;

@Component({
    selector: 'page-location-select',
    templateUrl: 'location-select.html'
})
export class LocationSelectPage {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    showList: boolean= false;
    latitude: number;
    longitude: number;
    autocompleteService: any;
    placesService: any;
    query: string = '';
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    locations:any;


    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.locations = JSON.parse(localStorage.getItem('koordinat'));
    }
    backButton() {
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot(MenuPage);
    }
    getItems(ev:any){
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        // Filter the items
      
        // Show the results
        this.showList = true;
      } else {  
        // hide the results when the query is empty
        this.showList = false;
      }
    }

    ionViewDidLoad(): void {
        console.log('spbu2', JSON.parse(localStorage.getItem('koordinat')));
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
        });
        //this.locations = JSON.parse(localStorage.getItem('koordinat'));

        this.CallLoading();

    }

    selectPlace(place) {

        this.places = [];

        let location = {
            lat: null,
            lng: null,
            name: place.name
        };

        this.placesService.getDetails({ placeId: place.place_id }, (details) => {

            this.zone.run(() => {

                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;

                this.maps.map.setCenter({ lat: location.lat, lng: location.lng });

                //this.locations = location;

            });

        });

    }
    close() {
        localStorage.removeItem('koordinat');
        this.viewCtrl.dismiss();
    }

    search(place) {

    }
    

    cari(place) {
        this.showList = false;
        this.saveDisabled = true;
        this.CallLoading();
        if (place.length > 0 && !this.searchDisabled) {
            let latLng;
            this.geolocation.getCurrentPosition().then((position) => {
                latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                this.placesService.nearbySearch({
                    location: latLng,
                    rankBy: google.maps.places.RankBy.DISTANCE,
                    type: [place]
                }, (results, status) => {
                    callback(results, status, this.maps.map)
                    this.locations = JSON.parse(localStorage.getItem('koordinat'));
                    
                });
                
                function clearOverlays(map) {
                    for (var i = 0; i < map.markers.length; i++ ) {
                        map.markers[i].setMap(null);
                    }
                    map.markers.length = 0;
                }

                function callback(results, status, map) {
                    clearOverlays(map);
                    map.markers= new Array();
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i <results.length; i++) {
                            var loc1 = latLng
                            if (typeof (results[i].geometry) != undefined) {
                                var loc2 = results[i].geometry.location;
                                var dist = loc2.distanceFrom(loc1);
                                results[i].distance = dist;
                                results[i].alamat = results[i].vicinity.split(',')[0];;
                                //console.log(results[i].distance);
                            }
                            createMarker(results[i], map);
                        }
                        localStorage.setItem('koordinat', JSON.stringify(results));
                    }
                }


                google.maps.LatLng.prototype.distanceFrom = function (latlng) {
                    var lat = [this.lat(), latlng.lat()]
                    var lng = [this.lng(), latlng.lng()]
                    var R = 6378137;
                    var dLat = (lat[1] - lat[0]) * Math.PI / 180;
                    var dLng = (lng[1] - lng[0]) * Math.PI / 180;
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) *
                        Math.sin(dLng / 2) * Math.sin(dLng / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c;
                    return Math.round(d);
                }

                function createMarker(place, map) {
                    var image = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)

                    }
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        animation: google.maps.Animation.DROP,

                        position: place.geometry.location,
                        title: place.name
                    });
                    
                    map.markers.push(marker);

                    // UNCOMMENT IF U WANT USE INFWOWINDOW
                    var infowindow = new google.maps.InfoWindow;
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.setContent(place.name);
                        infowindow.open(this.map, this);
                    });

                    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                        infoWindow.setPosition(pos);
                        infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
                        infoWindow.open(this.map);
                    }
                }
            });

        } else {
            this.locations = [];
        }

    }
    CallLoading(){
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles'
        });

        loading.present();

        setTimeout(() => {
        }, 100);

        setTimeout(() => {
            loading.dismiss();
        }, 7000);

    
    }
}