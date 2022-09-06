import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ChefMenuReviewComponent } from '../chef-menu-review/chef-menu-review.component';

@Component({
  selector: 'app-viewallchef',
  templateUrl: './viewallchef.component.html',
  styleUrls: ['./viewallchef.component.scss'],
})
export class ViewallchefComponent implements OnInit {

  constructor(public auth: AuthService,
             public user: UserService,
             public router: Router,
             private modalController: ModalController,) { 
               this.allChefData();
               this.user.menu();
             }

  ngOnInit() {}
  chefRes;
  chefAllData:any;
  chefArrayData=[];
allChefData(){
  // this.chefAllData="";
  this.auth.getAllChefData().subscribe(res=>{
    this.chefRes=res;
    this.chefAllData=this.chefRes.data;
    console.log(this.chefAllData)
    for(let i=0;i<this.chefAllData.length;i++){
  this.chefArrayData[i]=[
    {
      "id":this.chefAllData[i].id,
      "firstname": this.chefAllData[i].firstname,
      "lastname": this.chefAllData[i].lastname,
      "aboutme": this.chefAllData[i].aboutme,
      "address": this.chefAllData[i].address,
      "prof_image": this.chefAllData[i].prof_image,
      "specialization": this.chefAllData[i].specialization,
      "city": this.chefAllData[i].city,
      "country": this.chefAllData[i].country,
      "pin": this.chefAllData[i].pin,
      "phone": this.chefAllData[i].phone
    }
  ]
    }
    console.log(this.chefArrayData)
  },err=>{
    console.log(err)
  })
}
async openSingleDetails(chef:any){
  // const modal = await this.modalController.create({
  //   component: ChefMenuReviewComponent,
  //   cssClass: 'my-custom-class',
  //   componentProps: {
  // eventData: chef
  //   }
  // });
  // return await modal.present();
  this.user.chef_id=chef;
  this.router.navigateByUrl('/nav/chef-menu-review')
}
}
