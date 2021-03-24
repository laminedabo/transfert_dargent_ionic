import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {

  private routerInfo: BehaviorSubject<any>;

  constructor() {
    this.routerInfo = new BehaviorSubject<any>('');
  }

  getValue(): Observable<any> {
    return this.routerInfo.asObservable();
  }
  setValue(newValue: any): void {
    this.routerInfo.next(newValue);
  }
}