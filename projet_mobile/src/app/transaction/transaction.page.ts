import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  user: string;
  date: string;
  type: string;
  montant: number;
  frais: number;
}

const  ELEMENT_DATA: PeriodicElement[] = [
  {date: '11/03/20', user: 'Hydrogen', type: 'depot', montant: 19500, frais: 480},
  {date: '11/03/20', user: 'Helium', type: 'depot', montant: 30000, frais: 480},
  {date: '31/12/21', user: 'Lithium', type: 'retrait', montant: 50000, frais: 480},
  {date: '11/03/20', user: 'Beryllium', type: 'retrait', montant: 4500, frais: 480},
  {date:'11/03/20' , user: 'Boron', type: 'depot', montant: 20000, frais: 480},
  {date: '11/03/20', user: 'Carbon', type: 'retrait', montant: 350000, frais: 480},
  {date: '01/01/21', user: 'Nitrogen', type: 'depot', montant: 125450, frais: 480},
];

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['date', 'user', 'type', 'montant', 'frais'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}


