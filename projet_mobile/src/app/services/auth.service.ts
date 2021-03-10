import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient, private storage: Storage, private router: Router) { }

  login(user: any): Observable<any>{
    return this.http.post<any>(`${this.base_url}/login_check`, user);
  }

  logout(){
    this.storage.remove('token').then(
      () =>{
        this.router.navigate(['login']);
      }
    )
  }

  async isAuthenticated(){
    return await this.storage.get('token').then(
      () => {
        return true
      }
    )
  }

  async getToken(): Promise<string>{
    return await this.storage.get('token').then(
      (token) => {
        return token
      }
    )
  }
}
