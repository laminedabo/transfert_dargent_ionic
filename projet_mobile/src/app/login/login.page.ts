import { ConnectedUser } from './../roles/user.role';
import { connectedUser } from '../roles/roles.action';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userConn$: Observable<ConnectedUser>;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,private authservice: AuthService, private storage: Storage, private router: Router, private jwt: JwtService, private store: Store<{ userConnected: ConnectedUser }>) { 
    this.userConn$ = store.select('userConnected');
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('((7[76085][0-9]{7}$)|(3[03][98][0-9]{6}$))')]],
      password: ['', Validators.required],
    });
    this.formGroup.get('password').valueChanges.subscribe(
      ()=>{ this.login_err = false}
    )
    this.formGroup.get('username').valueChanges.subscribe(
      ()=>{ this.login_err = false}
    )
  }

  hide: boolean = true;

  waiting: boolean = false;

  login_err : boolean = false
  msgError = ''
  login(){

    if(this.formGroup.invalid){
      return null
    }
    this.waiting = !this.waiting
    this.authservice.login(this.formGroup.value).subscribe(
      (res: any) =>{
        const thisUser: ConnectedUser = {
          userId: res.userId,
          accountId: res.accountId,
          role: res.role,
          telephone: res.telephone
        }
        this.store.dispatch(connectedUser({user: thisUser}))
        this.storage.set('token', res.token).then(
          ()=>this.router.navigateByUrl('/accueil') 
        )
        this.waiting = !this.waiting
      },
      (error:any) =>{
        this.waiting = !this.waiting
        this.login_err = true
        if(error.status != null && error.status === 401){
          this.msgError = "Téléphone ou mot de passe incorecte";
        }
        else{
          this.msgError = "Vérifiez votre connexion internet";
        }
        return
      }
    )
  }

}
