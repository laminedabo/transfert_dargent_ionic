import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  user: string;
  date: string;
  type: string;
  montant: number;
  frais: number;
}

const  ELEMENT_DATA: PeriodicElement[] = [
  {date: '11/03/20', user: 'Pape', type: 'depot', montant: 19500, frais: 1200},
  {date: '01/12/20', user: 'Abdou', type: 'depot', montant: 30000, frais: 2500},
  {date: '31/01/21', user: 'Mor', type: 'retrait', montant: 50000, frais: 2900},
  {date: '21/05/20', user: 'Aly', type: 'retrait', montant: 4500, frais: 480},
  {date:'18/09/21' , user: 'Bouba', type: 'depot', montant: 20000, frais: 1200},
  {date: '14/11/20', user: 'Cheikh', type: 'retrait', montant: 350000, frais: 12000},
  {date: '01/01/21', user: 'Kali', type: 'depot', montant: 125450, frais: 1900},
];

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit, AfterViewInit {

  role$: Observable<string>;

  constructor(private store: Store<{ role: string }>) { 
    this.role$ = store.select('role');
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['date', 'user', 'type', 'montant', 'frais'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}


