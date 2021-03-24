import { SharedVariablesService } from './../services/shared-variables.service';
import { Router } from '@angular/router';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../services/toast.service'
import { DepotRetraitTransaction } from '../transaction.model';

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

  constructor(private _formBuilder: FormBuilder, public alertController: AlertController, private http: HttpService, public toast: ToastService, private router: Router, private share: SharedVariablesService) { }

  code: string = ''
  montant: any;
  date: Date;
  transaction: DepotRetraitTransaction;
  
  codeSuccess: boolean = false;
  codeError: boolean = false;
  msgError = '';
  waiting: boolean = false;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      IdCard: ['', [Validators.required, Validators.pattern('[12][0-9]{9,15}')]],
      codeRetrait: ['', [Validators.required, Validators.pattern('([0-9]{9}$)|(([0-9]{3}-){2}[0-9]{3}$)')]],
    });
    
    this.firstFormGroup.get("codeRetrait").valueChanges.subscribe((code: string) => {
      this.codeSuccess = false;
      if(this.firstFormGroup.get('codeRetrait').hasError('pattern')){
        this.msgError = 'CODE INCORRECTE'
        return
      }
      if (code!== null && code.trim()!=='' && code.length>=9) {
        this.codeError = false;
        this.waiting = true;
        if(!code.includes('-')){
          code = code.substring(0, 3) + "-" + code.substring(3, 6)+ "-" + code.substring(6, code.length);
        }
        this.waiting = true;
        this.http.get(`/user/transaction/${code}`).subscribe(
          (res:any)=>{
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
              else{
                this.codeError = true;
                this.codeSuccess = false
                this.msgError = 'CODE INVALIDE'
                return
              }
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
              async (res:any) => {
                console.log(res)
                this.toast.presentToast('dark', 'Opération réussie');
                this.share.setValue(this.montant)
                this.firstFormGroup.reset();
                this.codeSuccess = false;
                this.waiting = false;
                let alert = this.alertController.create({
                  header: 'Dépot Succès',
                  message: 'La transaction s\'est réalisée avec succès',
                  backdropDismiss: false,
                  buttons: [{
                    text: 'Okey',
                    handler: () => {
                      this.router.navigateByUrl('/accueil');
                    }
                  }]
                });
                (await alert).present();
              },
              async error =>{
                let alert = this.alertController.create({
                  header: 'Erreur survenue',
                  message: 'Une Erreur est survenue lors de la transaction.',
                  backdropDismiss: false,
                  buttons: [{
                    text: 'Je réssaie',
                    role: 'cancel',
                    handler: () => {
                      console.log('retry');
                    }
                  }]
                });
                (await alert).present();
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
