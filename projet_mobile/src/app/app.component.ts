import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router, private _location: Location,public alertController: AlertController) {
    this.initApp()
  }

  initApp(){
    this.platform.ready().then(
      () =>{
        this.router.navigateByUrl('splash')
      }
    )

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/login') || this._location.isCurrentPathEqualTo('/accueil')) {
        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } 
      else {
        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'Quittez l\'application',
      message: 'Voulez vous quittez ?',
      backdropDismiss: false,
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, 
      {
        text: 'Oui',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

}
