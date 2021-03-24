import { DataStateEnum } from './../state/transaction.state';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { AppDataState } from '../state/transaction.state';
import { map, startWith, catchError } from 'rxjs/operators';

export interface Frais {
  frais: number,
  etat: number,
  systeme: number,
  agence: number
} 
@Component({
  selector: 'app-calcul-frais',
  templateUrl: './calcul-frais.page.html',
  styleUrls: ['./calcul-frais.page.scss'],
})
export class CalculFraisPage implements OnInit {

  montant  = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  frais$: Observable<AppDataState<Frais>>;

  constructor(private http: HttpService,) { }

  readonly DataStateEnum = DataStateEnum;
  getData(montant: number){
    this.frais$ = this.http.get(`/user/${montant}/frais`).pipe(
      map( (data: any)=> ({
        dataState: DataStateEnum.LOADED,
        data: data.frais
      })),
      startWith({
        dataState: DataStateEnum.LOADING
      }),
      catchError(
        (error) =>of({
          dataState: DataStateEnum.ERROR,
          errorMessage: error.message
        })
      )
    )
  }

  ngOnInit() {
    this.montant.valueChanges.subscribe(mnt => {
      if (Number(mnt) && mnt>0 && mnt.trim()!=='') {
        this.getData(mnt)
      }
    })
  }

  typeFr = 'total'
  frais(type: string){
    this.typeFr = type
  }

}
