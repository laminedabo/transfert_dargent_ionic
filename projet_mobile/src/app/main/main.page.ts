import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';
import { ConnectedUser } from './../roles/user.role';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userConn$: Observable<ConnectedUser>;
  constructor(private storage: Storage, private jwt: JwtService, private auth: AuthService, private httpService: HttpService, private store: Store<{ userConnected: ConnectedUser }>) { 
    this.userConn$ = store.select('userConnected');
  }

  isAdmin : boolean;
  solde = 0.0
  date = new Date

  async ngOnInit() {
    await this.connect()
    this.userConn$.subscribe(
      (user: ConnectedUser) =>{
        this.httpService.get(`/admin/comptes/${user.accountId}`).subscribe(
          (compte: any) =>{
            this.solde = compte.solde
          }
        )
      }
    )
  }

  async connect(){
    this.storage.get('token').then(
      (token) => {
        this.isAdmin = this.jwt.decodeToken(token).roles[0]==='ROLE_ADMINAGENCE'?true:false;
      }
    )
  }

  soldeHidden: boolean = false
  hideSolde(){
    this.soldeHidden = !this.soldeHidden
  }

  logout(){
    this.auth.logout()
  }
}
