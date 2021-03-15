import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../services/toast.service'

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RetraitPage implements OnInit {

  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public alertController: AlertController, private http: HttpService, public toast: ToastService) { }

  code: string = ''
  montant: any;
  date: Date;
  transaction = {
    id: null,
    code: "",
    montant: null,
    sendFrom: {
      id: null,
      firstName: "",
      lastName: "",
      telephone: "",
      IdCard: ""
    },
    sendTo: {
      id: null,
      firstName: "",
      lastName: "",
      telephone: "",
      IdCard: ""
    }
  };
  
  codeSuccess: boolean = false;
  codeError: boolean = false;
  msgError = '';
  waiting: boolean = false;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      IdCard: ['', Validators.required],
      codeRetrait: ['', Validators.required],
    });
    
    this.firstFormGroup.get("codeRetrait").valueChanges.subscribe((code: string) => {
      if (code!== null && code.trim()!=='' && code.length>=11) {
        this.http.get(`/user/transaction/${code}`).subscribe(
          (res:any)=>{
            this.waiting = true;
            setTimeout(()=>{ 
              this.waiting = false;
              if (res[0] !== null) {
                if(res[0].retiredAt !== null){
                  this.codeError = true;
                  this.msgError = 'DÉJÀ RETIRÉ';
                  return
                }
                this.date = res[0].sendAt
                this.montant = res[0].montant
                this.transaction = res[0];
                this.codeSuccess = true;
                this.codeError = false;
                delete this.transaction.sendFrom.id;
                delete this.transaction.sendTo.id;
              }
              else if(code.length>=11){
                this.codeError = true;
                this.msgError = 'CODE INVALIDE'
                return
              }
            }, 1000);
          }
        ) 
      }
    })
  }

  showAlert() {

    if(this.firstFormGroup.invalid || this.transaction === null){
      return null
    }

    this.transaction.sendTo.IdCard = this.firstFormGroup.value.IdCard
    this.alertController.create({
      header: 'Demande de confirmation',
      message: this.Details(),
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('annuler');
          }
        },
        {
          text: 'Confirmer',
          cssClass: 'confirm',
          handler: () => {
            this.waiting = true;
            this.http.put(`/user/retrait/${this.transaction.id}`, this.transaction).subscribe(
              (res:any) => {
                console.log(res)
                this.toast.presentToast('dark', 'Opération réussie');
                this.firstFormGroup.reset();
                this.codeSuccess = false;
                this.waiting = false;
              },
              error =>{
                alert('error occured')
              }
            )
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }


  Details(): string{
    const message = `<div>`+
    `<ion-label>Bénéficiaire</ion-label>`+
    `</div>`+
    `<ion-item>`+
    `<ion-label>${this.transaction.sendTo.firstName} ${this.transaction.sendTo.lastName}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>Tétéphone</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.transaction.sendTo.telephone}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>CNI</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.transaction.sendTo.IdCard}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>Montant</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.transaction.montant}</ion-label>`+
    `</ion-item>`+
    `<br/><div>`+
    `<ion-label>Emétteur</ion-label>`+
    `</div>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.transaction.sendFrom.firstName} ${this.transaction.sendFrom.lastName}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>Tétéphone</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.transaction.sendFrom.telephone}</ion-label>`+
    `</ion-item>`

    return message
  }
}
