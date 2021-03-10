import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-calcul-frais',
  templateUrl: './calcul-frais.page.html',
  styleUrls: ['./calcul-frais.page.scss'],
})
export class CalculFraisPage implements OnInit {

  montant  = new FormControl('', [Validators.required]);
  frais = 0;
  waiting: boolean = false;

  constructor(private http: HttpService,) { }

  ngOnInit() {
    this.montant.valueChanges.subscribe(mnt => {
      this.waiting = true
      if (Number(mnt) && mnt>0 && mnt.trim()!=='') {
        this.http.get(`/user/${mnt}/frais`).subscribe(
          (res:any)=>{
            setTimeout(
              ()=>{
                this.frais = res.frais
                this.waiting = false
              }, 1500
            )
          }
        ) 
      }
      else{
        this.waiting = false
        this.frais = 0
      }
    })
  }

}
