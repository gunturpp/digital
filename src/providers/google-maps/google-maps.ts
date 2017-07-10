import { Injectable } from '@angular/core';
import { ConnectivityServiceProvider } from '../connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
declare var google: any;
 
@Injectable()
export class GoogleMapsProvider {
  url2='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-6.1307391,106.924093&radius=1000&keyword=SPBU&key=AIzaSyCVgBP5RlW8x9R3MtZj81uE-2JpcGmUupA';
  spbu:any=[];
  x:any;
  mapElement: any;
  pleaseConnect: any;
  map: any;
  infowindow:any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string = "AIzaSyCVgBP5RlW8x9R3MtZj81uE-2JpcGmUupA";
  scope:any;
  xscope:any=[];
  constructor(public http:Http, public connectivityService: ConnectivityServiceProvider, public geolocation: Geolocation) {
  }
  init(mapElement: any, pleaseConnect: any): Promise<any> { 
    localStorage.removeItem('koordinat');
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
      return this.loadGoogleMaps();
  }
 
  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap(); 

        if(this.connectivityService.isOnline()){ 
          window['mapInit'] = () => {
            this.initMap().then(() => {
              resolve(true);
            });
            this.enableMap();
          }
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
            // script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
 
        } 
      } else {
 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
        resolve(true);
 
      }
 
      this.addConnectivityListeners();
 
    }); 
  }

  initMap(): Promise<any> {
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
        
        // current my position
      this.geolocation.getCurrentPosition().then((position) => {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        // REAL
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // DUMMY        
        // let latLng = new google.maps.LatLng(-6.129614, 106.926856);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // google mapsnya
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        
        // current location image
         var image = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'blue',
          fillOpacity: 0.5,
          strokeColor: 'blue',
          scale: 7
        };
        var marker = new google.maps.Marker({
          map:this.map,
          icon:image,
          animation: google.maps.Animation.DROP,
          position:latLng
        });
        resolve(true);
          let request = {
          location: latLng,
          // radius: '1000'
          rankBy: google.maps.places.RankBy.DISTANCE,
          keyword: ['spbu','gas station']
          };

        let service = new google.maps.places.PlacesService(this.map);
        //service.nearbySearch( request, callback);
        service.nearbySearch({
                location: latLng,
                rankBy: google.maps.places.RankBy.DISTANCE,
                type: ['gas station']
              }, (results, status) => {
                  callback(results, status, this.map)
              });

        function callback(results, status, map) {
        map.markers= new Array();
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i <6; i++) {
            var loc1 = latLng
            if(typeof(results[i].geometry)!=undefined){
              var loc2 = results[i].geometry.location;
              var dist = loc2.distanceFrom(loc1);
              results[i].distance=dist;
              results[i].alamat = results[i].vicinity.split(',')[0];
            }
            createMarker(results[i], map);
          }
          localStorage.setItem('koordinat',JSON.stringify(results));
          }
        }
        

        google.maps.LatLng.prototype.distanceFrom = function(latlng) {
          var lat = [this.lat(), latlng.lat()]
          var lng = [this.lng(), latlng.lng()]
          var R = 6378137;
          var dLat = (lat[1]-lat[0]) * Math.PI / 180;
          var dLng = (lng[1]-lng[0]) * Math.PI / 180;
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat[0] * Math.PI / 180 ) * Math.cos(lat[1] * Math.PI / 180 ) *
          Math.sin(dLng/2) * Math.sin(dLng/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
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
          map:map,
          icon: image,
          animation: google.maps.Animation.DROP,
          
          position: place.geometry.location,
          title:place.name
        });
        map.markers.push(marker);

        // UNCOMMENT IF U WANT USE INFWOWINDOW
        var infowindow = new google.maps.InfoWindow;
        google.maps.event.addListener(marker, 'click', function() {
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
      


// //direction
//         directionsDisplay.setMap(map);

//         var onChangeHandler = function() {
//           this.calculateAndDisplayRoute(directionsService, directionsDisplay);
//         };
//         document.getElementById('start').addEventListener('change', onChangeHandler);
//         document.getElementById('end').addEventListener('change', onChangeHandler);
      
//        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//         directionsService.route({
//           origin: document.getElementById('start'),
//           destination: document.getElementById('end'),
//           travelMode: 'DRIVING'
//         }, function(response, status) {
//           if (status === 'OK') {
//             directionsDisplay.setDirections(response);
//           } else {
//             window.alert('Directions request failed due to ' + status);
//           }
//         });
//       }


     });
     
    });
  }
  
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
   addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }
 

}