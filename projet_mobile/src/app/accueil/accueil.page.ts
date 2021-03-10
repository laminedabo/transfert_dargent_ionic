import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { JwtService } from '../services/jwt.service'

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  constructor(private menu: MenuController, private auth: AuthService, private storage: Storage, private jwt: JwtService) { }

  isAdmin : boolean;

  async ngOnInit() {
    await this.connect()
    console.log('ok')
  }

  async connect(){
    console.log('ko')
    this.storage.get('token').then(
      (token) => {
        this.isAdmin = this.jwt.decodeToken(token).roles[0]==='ROLE_ADMINAGENCE'?true:false;
      }
    )
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'main-menu');
    this.menu.open('main-menu');
  }

  logout(){
    this.auth.logout()
  }

}
