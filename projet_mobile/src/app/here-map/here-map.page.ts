import { Component, OnInit } from '@angular/core';

import { ActionSheetController, Platform, AlertController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.page.html',
  styleUrls: ['./here-map.page.scss'],
})
export class HereMapPage implements OnInit {

  map: GoogleMap;

  constructor(
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private platform: Platform
  ) { 
    if (this.platform.is('cordova')) {
      this.loadMap();
    }
  }

  ngOnInit() {
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyCUNjWbM-pWdpwELzdjsj7R1FhgwVGRmtw',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyCUNjWbM-pWdpwELzdjsj7R1FhgwVGRmtw'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 14.758781,
          lng: -17.437819
        },
        zoom: 12,
        tilt: 30
      }
    });
  }
}
