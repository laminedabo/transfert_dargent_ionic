import { SharedVariablesService } from './../services/shared-variables.service';
import { Router } from '@angular/router';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../services/toast.service'
import { Store } from '@ngrx/store';
import { soldeUpdate } from '../solde/solde.actions';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class DepotPage implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public alertController: AlertController, private http: HttpService, public toast: ToastService, private router: Router, private store: Store<{ solde: number }>) { }

  frais = 0;
  total = 0;
  waiting: boolean = false;
  emetFound: boolean = false
  benefFound: boolean = false

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      IdCard: ['', [Validators.required, Validators.pattern('[12][0-9]{9,15}')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('((7[76085][0-9]{7}$)|(3[03][98][0-9]{6}$))')]],
      montant: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('((7[76085][0-9]{7}$)|(3[03][98][0-9]{6}$))')]]
    });
    
    this.firstFormGroup.get("montant").valueChanges.subscribe(mnt => {
      if (Number(mnt) && mnt>0 && mnt.trim()!=='') {
        this.total = mnt;
        this.waiting = !this.waiting
        this.http.get(`/user/${mnt}/frais`).subscribe(
          (res:any)=>{
            this.frais = res.frais.frais
            this.total = +mnt+(+res.frais.frais)
            this.waiting = !this.waiting
          }
        ) 
      }
      else{
        this.total = 0
        this.frais = 0
      }
    })

    this.firstFormGroup.get("IdCard").valueChanges.subscribe((id:string) => {
      if (id!==null && id.trim()!=='' && id.length >=10) {
        this.waiting = !this.waiting
        this.http.get(`/user/client/nci/${id}`).subscribe(
          (res:any)=>{
            this.waiting = !this.waiting
            if (res[0] !== null) {
              this.toast.presentToast('dark', 'Un résultat trouvé')
              this.firstFormGroup.get("firstName").setValue(res[0].firstName)
              this.firstFormGroup.get("lastName").setValue(res[0].lastName)
              this.firstFormGroup.get("telephone").setValue(res[0].telephone)
              this.emetFound = true
            }
            else{
              this.firstFormGroup.get("firstName").reset()
              this.firstFormGroup.get("lastName").reset()
              this.firstFormGroup.get("telephone").reset()
              this.emetFound = false
            }
          }
        ) 
      }
    })

    this.secondFormGroup.get("telephone").valueChanges.subscribe((phone:string) => {
      if (phone !==null && phone.trim()!=='' && phone.length ==9) {
        this.waiting = !this.waiting
        this.http.get(`/user/client/phone/${phone}`).subscribe(
          (res:any)=>{
            this.waiting = !this.waiting
            if (res[0] !== null) {
              this.toast.presentToast('dark', 'Un résultat trouvé')
              this.secondFormGroup.get("firstName").setValue(res[0].firstName)
              this.secondFormGroup.get("lastName").setValue(res[0].lastName)
              this.benefFound = true
            }
            else{
              // this.secondFormGroup.reset()
              this.benefFound = false
            }
          }
        ) 
      }
    })
  }

  showCode: boolean = false;
  code: string = '';

  showAlert() {

    if(this.firstFormGroup.invalid || this.secondFormGroup.invalid){
      return null
    }

    this.alertController.create({
      header: 'Demande de onfirmation',
      cssClass:'alertHeader',
      message: this.Details(),
      buttons: [
        {
          text: 'Revérifier',
          role: 'cancel',
          handler: () => {
            console.log('annuler');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            const transact : any = {
              montant: this.firstFormGroup.value.montant,
              sendFrom: {
                firstName: this.firstFormGroup.value.firstName,
                lastName: this.firstFormGroup.value.lastName,
                telephone: this.firstFormGroup.value.telephone,
                IdCard: this.firstFormGroup.value.IdCard,
              },
              sendTo: {
                firstName: this.secondFormGroup.value.firstName,
                lastName: this.secondFormGroup.value.lastName,
                telephone: this.secondFormGroup.value.telephone,
              }  
            }
            transact.montant = Number(transact.montant)
            this.waiting = true
            this.http.post('/user/compte/depot', transact).subscribe(
              (res:any) => {
                this.waiting = false
                this.firstFormGroup.reset()
                this.secondFormGroup.reset()
                this.code = res.code;
                this.showCode = true;
                this.toast.presentToast('success', 'Opération réussie')
                this.store.dispatch(soldeUpdate({solde: res.solde}))
                // setTimeout(function(){ this.router.navigateByUrl('/accueil'); }, 3000); 
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
    `<ion-label>Emétteur</ion-label>`+
    `</div>`+
    `<ion-item>`+
    `<ion-label>${this.firstFormGroup.value.firstName} ${this.firstFormGroup.value.lastName}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>Tétéphone</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.firstFormGroup.value.telephone}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>CNI</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.firstFormGroup.value.IdCard}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>Montant</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.firstFormGroup.value.montant}</ion-label>`+
    `</ion-item>`+
    `<br/><div>`+
    `<ion-label>Bénéficiaire</ion-label>`+
    `</div>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.secondFormGroup.value.firstName} ${this.secondFormGroup.value.lastName}</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>Tétéphone</ion-label>`+
    `</ion-item>`+
    `<ion-item  lines='none'>`+
    `<ion-label>${this.secondFormGroup.value.telephone}</ion-label>`+
    `</ion-item>`

    return message
  
  }

}
