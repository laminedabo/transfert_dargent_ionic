import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: Storage, private router: Router) { }

  login(user: any): Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/api/login_check', user);
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
