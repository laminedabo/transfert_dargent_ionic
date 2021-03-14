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

export interface Agence{
  id: number,
  infos: string,
  lng: number,
  lat: number
}

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.page.html',
  styleUrls: ['./here-map.page.scss'],
})
export class HereMapPage implements OnInit {

  map: GoogleMap;
  // maps: GoogleMap[]

  agences: Agence[] = [
    {
      id: 1,
      infos: "Walo services",
      lat: 14.733380,
      lng: -17.454700
    },
    {
      id: 2,
      infos: "Ldab Global Services",
      lat: 14.732386,
      lng: -17.424401
    },
    {
      id: 3,
      infos: "Ndiaga Ndiaye",
      lat: 14.736038,
      lng: -17.469120
    },
    {
      id: 4,
      infos: "Arret Gaindé Gui",
      lat: 14.704161,
      lng: -17.451954
    },
    {
      id: 5,
      infos: "Bountou Pikine",
      lat: 14.727738,
      lng: -17.486973
    }
  ]

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
    this.agences.forEach(
      (agence: Agence) =>{
        const marker: Marker = this.map.addMarkerSync({
          title: agence.infos,
          icon: 'red',
          animation: 'DROP',
          position: {lat: agence.lat, lng: agence.lng}
       });
      }
    )
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyCUNjWbM-pWdpwELzdjsj7R1FhgwVGRmtw',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyCUNjWbM-pWdpwELzdjsj7R1FhgwVGRmtw'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 14.736703,
          lng: -17.452984
        },
        zoom: 12,
        tilt: 30
      }
    });
  }

  async mapOptions() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Satellite',
        handler: () => {
          this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
        }
      }, {
        text: 'Plan',
        handler: () => {
          this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
        }
      }, {
        text: 'Terrain',
        handler: () => {
          this.map.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
        }
      }, {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  placeMarker(markerTitle: string) {
    const marker: Marker = this.map.addMarkerSync({
       title: markerTitle,
       icon: 'blue',
       animation: 'DROP',
       position: this.map.getCameraPosition().target
    });
  }

 async addMarker() {
  const alert = await this.alertController.create({
    header: 'Ajouter un emplacement',
    inputs: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Le titre'
      }
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ajouter',
        handler: data => {
          this.placeMarker(data.title);
        }
      }
    ]
  });
  await alert.present();
  }
}
