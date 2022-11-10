import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menudetails',
  templateUrl: './menudetails.component.html',
  styleUrls: ['./menudetails.component.scss'],
})
export class MenudetailsComponent implements OnInit {

  @Input() ev_data:any;
  menuMedia:any;
  constructor(private modalController: ModalController,
              public auth: AuthService,
    public user:UserService) {
    
    this.ev_data;
   }
   slideOpts={

   }
   menuArray:[
     {
      id:1,
      path:'../../../assets/img/user_icon.png',
     }
   ];
   menu_name:any;
   menu_desc:any;
   menu_category:any;
ionViewWillEnter(){
  console.log(this.ev_data);
  this.menu_name=this.ev_data.title;
  this.menu_desc=this.ev_data.description;
  this.menu_category=this.ev_data.category.title;
  if(this.ev_data.medias==[] || this.ev_data.medias.length==0){
    console.log('menu media is empty');
    // this.menuMedia.push(this.menuArray);
    // this.menuMedia=this.menuArray;
    
    // console.log(this.menuArray);
  }else{
    console.log(this.ev_data.medias);
    this.menuMedia=this.ev_data.medias;
    // this.menuArray=this.ev_data.medias
    // for(let i=0;i<=this.ev_data.medias.length;i++){
    //   this.menuMedia[i]={
    //     path: this.ev_data.medias[i]
    //   }
    // }
    // this.menuMedia.push(this.ev_data.medias);
   
  }
}
  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss({
      // 'dismissed': true
    });
  }
}
