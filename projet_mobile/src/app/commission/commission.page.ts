import { map, startWith, catchError } from 'rxjs/operators';
import { DataStateEnum } from './../state/transaction.state';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { AppDataState } from '../state/transaction.state';
import { Store } from '@ngrx/store';
import { ConnectedUser } from '../roles/user.role';
import { Transaction } from '../transaction.model';



@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit, AfterViewInit {

  ELEMENT_DATA: Transaction[] = []
  trans$: Observable<AppDataState<Transaction[]>>;
  readonly DataStateEnum = DataStateEnum;

  userConn$: Observable<ConnectedUser>;

  constructor(private http: HttpService, private store: Store<{ userConnected: ConnectedUser }>) { 
    this.userConn$ = store.select('userConnected');
  }

  userId = null;
  accountId = null;
  total_amount = 0;
  dateDebut = '';
  dateFin = '';
  
  ngOnInit() {
    this.userConn$.subscribe(
      (user: ConnectedUser) =>{
        if (user.userId !==null) {
          this.userId = user.userId;
          this.accountId = user.accountId,
          this.getTransactions(this.accountId)
        }
      }
    )
  }

  displayedColumns: string[] = ['retiredAt', 'type', 'montant'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getTransactions(compteId, depot='', retrait='', senderId='', withdrawerId='', dateDebut='', dateFin=''){
    // if (compteId === null) {
    //   return
    // }
    this.trans$ = null;
    this.trans$ = this.http.getTransactions(compteId, depot, retrait, senderId, withdrawerId, dateDebut, dateFin).pipe(
      map(
        (data) =>({
          dataState: DataStateEnum.LOADED,
          data: data,
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

  typeTransaction(tab: Transaction[] = [], type?: string):number{
    var total_amount = 0;
    switch(type){
      case 'depot':{
        this.getTransactions(this.accountId, '')
        tab.forEach(
          (trans: Transaction) =>{
            total_amount+=trans.partDepot
          }
        )
        break
      }
      case 'retrait':{
        this.getTransactions('', '',this.accountId)
        tab.forEach(
          (trans: Transaction) =>{
            total_amount+=trans.partRetrait
          }
        )
        break
      }
      default:{
        // this.getTransactions(this.accountId)
        tab.forEach(
          (trans: Transaction) =>{
            total_amount+=trans.partSysteme
          }
        )
      }
    }
    this.total_amount = total_amount
    return total_amount
  }

  dateDebutChange(data){
    const date: string = data.detail.value.split('T')[0]
    this.getTransactions(this.accountId, '', '','','', date)    
  }
}
