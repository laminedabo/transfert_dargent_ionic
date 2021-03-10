import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private helper :JwtHelperService) { }
 
  decodeToken(token: string){
    return this.helper.decodeToken(token)
  }

  tokenExpiration(token: string){
    return this.helper.getTokenExpirationDate(token)
  }

  isTokenExpired(token: string){
    return this.helper.isTokenExpired(token)
  }
}
