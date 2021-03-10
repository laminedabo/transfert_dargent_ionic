import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { JwtService } from '../services/jwt.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private storage: Storage, private jwt: JwtService) { }

  isAdmin : boolean;

  async ngOnInit() {
    await this.connect()
  }

  async connect(){
    this.storage.get('token').then(
      (token) => {
        this.isAdmin = this.jwt.decodeToken(token).roles[0]==='ROLE_ADMINAGENCE'?true:false;
      }
    )
  }

}
