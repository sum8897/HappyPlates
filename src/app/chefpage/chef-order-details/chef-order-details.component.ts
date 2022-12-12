import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chef-order-details',
  templateUrl: './chef-order-details.component.html',
  styleUrls: ['./chef-order-details.component.scss'],
})
export class ChefOrderDetailsComponent implements OnInit {

 
  @Input() order_data:any;
  menu_image:any;

  constructor(private modalController: ModalController,
              public auth: AuthService,
    public user:UserService) {
    this.user.menu();
    this.order_data;
   }

  ngOnInit() {}
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  };
  ionViewWillEnter(){
   console.log(this.order_data);
   this.menu_image=this.order_data.ordersdetails[0].menu_img;
  }
  getblogImage(imgPath:any){
    const endPath= imgPath;
    if(endPath=="" || endPath==undefined){
      return '../../../assets/img/user_icon.png'
    }
    else{
      return imgPath;
    }
   }
  dismiss(){
    this.modalController.dismiss();
  }
}
