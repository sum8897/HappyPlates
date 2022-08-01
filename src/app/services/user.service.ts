import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user_name;
  user_type;
  chef_user:boolean;
  customer_user:boolean;
  constructor(  public toast:ToastController,
    public loadingController: LoadingController,) { }
    chefMenuType:any;
  isLoading = false;
           
  async present( msg:any ) {
    this.isLoading = true;
    return await this.loadingController.create({
     message: msg,
     mode:'ios'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }          
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  async showToast(msg){
    let toast =await this.toast.create({
      message: msg,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }
}
