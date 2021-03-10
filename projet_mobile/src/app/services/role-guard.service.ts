import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Injectable()
export class RoleGuardService implements CanActivate 
{  
  constructor(public auth: AuthService, public router: Router, private jwt: JwtService) {}  
  canActivate(route: ActivatedRouteSnapshot): boolean{ 

  const expectedRole = route.data.expectedRole;    
    const token = localStorage.getItem('token');    // decode the token to get its payload
    const tokenPayload = this.jwt.decodeToken(token);    
    if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {

      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}