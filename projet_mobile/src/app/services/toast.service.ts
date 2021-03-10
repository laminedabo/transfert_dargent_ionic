import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(color:string, message: string) {
    const toast = await this.toastController.create({
      color: color,
      message: message,
      mode: 'ios',
      duration: 2000
    });
    toast.present();
  }
}
