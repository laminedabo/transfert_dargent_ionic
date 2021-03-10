import { adminAgence, UserAgence } from './../roles/roles.state';
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

  role$: Observable<string>;

  constructor(private authservice: AuthService, private storage: Storage, private router: Router, private jwt: JwtService, private store: Store<{ role: string }>) { 
    this.role$ = store.select('role');
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
        if (this.jwt.decodeToken(res.token).roles[0]==='ROLE_ADMINAGENCE') {
          this.store.dispatch(adminAgence())
        }
        else if (this.jwt.decodeToken(res.token).roles[0]==='ROLE_UTILISATEUR') {
          this.store.dispatch(UserAgence())
        }
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
