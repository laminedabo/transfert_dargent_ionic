import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTPInterceptorService } from './services/http-interceptor.service';
import { roleReducer } from './roles/roles.reducer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    StoreModule.forRoot({ role: roleReducer }),
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    BrowserAnimationsModule, 
    MaterialModule,
    HttpClientModule,
    JwtModule
],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
