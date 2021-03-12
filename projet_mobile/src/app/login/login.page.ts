import { ConnectedUser } from './../roles/user.role';
import { connectedUser } from '../roles/roles.action';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userConn$: Observable<ConnectedUser>;

  constructor(private authservice: AuthService, private storage: Storage, private router: Router, private jwt: JwtService, private store: Store<{ userConnected: ConnectedUser }>) { 
    this.userConn$ = store.select('userConnected');
  }

  ngOnInit() {
  }

  hide: boolean = true;
  user :any = {
    username: '',
    password: ''
  }
  waiting: boolean = false;

  login_err : boolean = false
  login(){
    if(this.user.username === '' || this.user.password === ''){
      return null
    }
    this.waiting = true
    this.authservice.login(this.user).subscribe(
      (res: any) =>{
        const thisUser: ConnectedUser = {
          userId: res.userId,
          accountId: res.accountId,
          role: res.role,
          telephone: res.telephone
        }
        this.store.dispatch(connectedUser({user: thisUser}))
        setTimeout(
          ()=>{
            this.storage.set('token', res.token)
            this.waiting = false
            this.router.navigateByUrl('/accueil')
          }, 1000
        )
      },
      (error:any) =>{
        this.waiting = false
        this.login_err = true
        return
        // console.log(error) à ameliorer
      }
    )
  }

}
