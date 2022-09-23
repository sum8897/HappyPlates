import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.scss'],
})
export class EditmenuComponent implements OnInit {
  @Input() menu_data_list_all:any;
  constructor(public modalCtrl: ModalController,
             private auth: AuthService,
             private user: UserService,
             private common:CommonService) { 
              
             }

  ngOnInit() {

    
  }
  ionViewWillEnter(){
    this.common.food_name=this.menu_data_list_all.title;
    this.common.reg_price=this.menu_data_list_all.price;
    this.common.others_price=this.menu_data_list_all.price;
    this.common.food_type= 'veg';
    this.common.descr=this.menu_data_list_all.description;
    this.common.menu_media=this.menu_data_list_all.medias[0].path;
    this.common.croppedImagePath='http://103.139.58.242/~clientpro/amantran/public'+this.common.menu_media;
    this.common.menu_id=this.menu_data_list_all.id;
    console.log(this.common.croppedImagePath);
  }
  dismiss(){
    this.modalCtrl.dismiss();
      }

  
}
