import { map, startWith, catchError } from 'rxjs/operators';
import { DataStateEnum } from './../state/transaction.state';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { AppDataState } from '../state/transaction.state';
import { Store } from '@ngrx/store';
import { ConnectedUser } from '../roles/user.role';

export interface Transaction {
  retiredAt: Date;
  type: string;
  montant: number;
}


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

  userId = 13;
  accountId = 4;
  ngOnInit() {
    this.userConn$.subscribe(
      (user: ConnectedUser) =>{
        // if (user.userId) {
          this.userId = user.userId;
          this.trans$ = this.http.getTransaction(this.userId).pipe(
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
        // }
      }
    )

    this.trans$.subscribe(
      (trans) =>{
        console.log(trans.data)
      }
    )
  }

  displayedColumns: string[] = ['retiredAt', 'type', 'montant'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
