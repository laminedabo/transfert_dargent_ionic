import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,   } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service'
import { Storage } from '@ionic/storage';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorService implements HttpInterceptor{

  constructor(private storage: Storage, private jwt: JwtService, private router: Router, private toast: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.storage.get('token'))
      .pipe(
        switchMap(token => {
          if (token !==null) {
            if (this.jwt.isTokenExpired(token)) {
              this.toast.presentToast('warning', 'Votre session a expiré');
              this.storage.remove('token').then(
                () =>this.router.navigateByUrl('/login')
              );
              return
            }
              request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
          }
          request = request.clone({ headers: request.headers.set('Accept', 'application/json')});
          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                return event;
              }
              return;
            }),
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
        })
      );
  }
}