import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authservice: AuthService, private storage: Storage, private router: Router) { }

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
