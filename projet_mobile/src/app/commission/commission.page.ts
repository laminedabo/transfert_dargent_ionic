import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  date: string;
  type: string;
  montant: number;
}

const  ELEMENT_DATA: PeriodicElement[] = [
  {date: '11/03/20', type: 'depot', montant: 19500},
  {date: '11/03/20', type: 'depot', montant: 30000},
  {date: '11/03/20', type: 'retrait', montant: 50000},
  {date: '11/03/20', type: 'retrait', montant: 4500},
  {date:'11/03/20' , type: 'depot', montant: 20000},
  {date: '11/03/20', type: 'retrait', montant: 350000},
  {date: '11/03/20', type: 'depot', montant: 125450},
];

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['date', 'type', 'montant'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
