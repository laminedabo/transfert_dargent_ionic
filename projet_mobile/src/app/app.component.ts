import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {
    this.initApp()
  }

  initApp(){
    this.platform.ready().then(
      () =>{
        this.router.navigateByUrl('splash')
      }
    )
  }
}
