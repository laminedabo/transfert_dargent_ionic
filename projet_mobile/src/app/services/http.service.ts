import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public base_url = environment.base_url;

  post(url: string, data: any){
    return this.http.post(this.base_url+url, data)
  }

  put(url: string, data: any){
    return this.http.put(this.base_url+url, data)
  }

  patch(url: string, data: any){
    return this.http.patch(this.base_url+url, data)
  }

  get(url: string){
    return this.http.get(this.base_url+url)
  }

  getTransactions(compteId, depot?, retrait?, senderId?, withdrawerId?, dateDebut?, dateFin?){
    return this.http.get(`${this.base_url}/user/transactions?sender.id=${senderId}&compte.id=${compteId}&compteDepot.id=${depot}&compteRetrait.id=${retrait}`)
  }
}
