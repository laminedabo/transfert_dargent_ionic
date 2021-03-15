import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../services/toast.service'

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

  constructor(private _formBuilder: FormBuilder, public alertController: AlertController, private http: HttpService, public toast: ToastService) { }

  frais = 0;
  total = 0;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      IdCard: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required],
      montant: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required]
    });
    
    this.firstFormGroup.get("montant").valueChanges.subscribe(mnt => {
      if (Number(mnt) && mnt>0 && mnt.trim()!=='') {
        this.total = mnt
        this.http.get(`/user/${mnt}/frais`).subscribe(
          (res:any)=>{
            this.frais = res.frais
            this.total = +mnt+(+res.frais)
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
        this.http.get(`/user/client/nci/${id}`).subscribe(
          (res:any)=>{
            if (res[0] !== null) {
              this.toast.presentToast('dark', 'Un résultat trouvé')
              this.firstFormGroup.get("firstName").setValue(res[0].firstName)
              this.firstFormGroup.get("lastName").setValue(res[0].lastName)
              this.firstFormGroup.get("telephone").setValue(res[0].telephone)
            }
          }
        ) 
      }
    })

    this.secondFormGroup.get("telephone").valueChanges.subscribe((phone:string) => {
      if (phone !==null && phone.trim()!=='' && phone.length ==9) {
        this.http.get(`/user/client/phone/${phone}`).subscribe(
          (res:any)=>{
            if (res[0] !== null) {
              this.toast.presentToast('dark', 'Un résultat trouvé')
              this.secondFormGroup.get("firstName").setValue(res[0].firstName)
              this.secondFormGroup.get("lastName").setValue(res[0].lastName)
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
            this.http.post('/user/compte/depot', transact).subscribe(
              (res:any) => {
                console.log(res)
                this.firstFormGroup.reset()
                this.secondFormGroup.reset()
                this.code = res.code;
                this.showCode = true;
                this.toast.presentToast('success', 'Opération réussie')
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
