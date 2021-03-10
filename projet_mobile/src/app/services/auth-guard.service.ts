import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {  
  constructor(public auth: AuthService, public router: Router) {}  
  
  canActivate():Promise<boolean> {
    const val = this.auth.getToken().then(
      (token) =>{
        if(token===null){
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }
    )    
    return val
  }
}
