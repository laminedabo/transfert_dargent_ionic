import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';
import { ConnectedUser } from './../roles/user.role';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service'
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userConn$: Observable<ConnectedUser>;
  constructor(private storage: Storage, private toast: ToastService, private jwt: JwtService, private auth: AuthService, private httpService: HttpService, private store: Store<{ userConnected: ConnectedUser }>) { 
    this.userConn$ = store.select('userConnected');
    
  }

  isAdmin : boolean;
  solde = 0.0
  date = new Date
  accountId = null

  async ngOnInit() {
    await this.connect()
    this.userConn$.subscribe(
      (user: ConnectedUser) =>{
        this.httpService.get(`/admin/comptes/${user.accountId}`).subscribe(
          (compte: any) =>{
            this.solde = compte.solde
            this.accountId = compte.id
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
    if(this.accountId !== null){
      this.httpService.get(`/admin/comptes/${this.accountId}`).subscribe(
        (compte: any) =>{
          this.solde = compte.solde
          this.date = new Date
        }
      )
    }
  }

  logout(){
    this.auth.logout()
  }

  myInfos(){
    this.toast.presentToast('success', 'Dev By Lamine Dabo @LDabDev')
  }
}
