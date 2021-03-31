import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';
import { ConnectedUser } from './../roles/user.role';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service'
import { ToastService } from '../services/toast.service';
import { soldeUpdate } from '../solde/solde.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userConn$: Observable<ConnectedUser>;
  solde$: Observable<number>
  constructor(private storage: Storage, private toast: ToastService, private jwt: JwtService, private auth: AuthService, private httpService: HttpService, private store: Store<{ userConnected: ConnectedUser, solde: number }>) { 
    this.userConn$ = store.select('userConnected');
    this.solde$ = store.select('solde');
    
  }

  isAdmin : boolean;
  date = new Date
  accountId = null

  async ngOnInit() {
    await this.connect()
    this.userConn$.subscribe(
      (user: ConnectedUser) =>{
        this.httpService.get(`/admin/comptes/${user.accountId}`).subscribe(
          (compte: any) =>{
            this.store.dispatch(soldeUpdate({solde: compte.solde}))
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
  }

  logout(){
    this.auth.logout()
  }

  myInfos(){
    this.toast.presentToast('success', 'Dev By Lamine Dabo @LDabDev')
  }
}
