import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chef-menu-review',
  templateUrl: './chef-menu-review.component.html',
  styleUrls: ['./chef-menu-review.component.scss'],
})
export class ChefMenuReviewComponent implements OnInit {
  type: string;
  menu=true;
  chef=false;
  menu_data;
  menu_data_list;
  constructor(private user: UserService,
             public auth : AuthService) {
              //  this.menuData();
               this.user.menu();
               console.log(this.user.chef_id.id);
               this.chefProfileGet(this.user.chef_id.id);
               this.menuData(this.user.chef_id.id);
              }
    ionViewWillEnter(){

    }
  ngOnInit() {
    if(this.user.chefMenuType=="" || this.user.chefMenuType==[] || this.user.chefMenuType ==undefined){
      this.type = 'menu';
      this.menu=true;
      this.chef=false;
    }else{
      this.type = this.user.chefMenuType;
      console.log(this.type);
      if(this.type=='menu'){
        this.menu=true;
        this.chef=false;
      }else{
        this.menu=false;
        this.chef=true;
      }
    }

  }
  segmentChanged(ev: any) {
    this.type = ev.detail.value;
    if(this.type=='menu'){
      this.menu=true;
      this.chef=false;
      this.menuData(this.user.chef_id.id);
      let body={
        fname:"ashish",
        lname:"chaurasiya",
      }
    }else{
      this.menu=false;
      this.chef=true;
    }
    console.log('Segment changed', this.type);
  }
  menuData(chef_id){
    this.user.present('wait...');
    this.auth.getChefMenuData(chef_id).subscribe((data)=>{
     this.user.dismiss();
     this.menu_data=data;
     this.menu_data_list=this.menu_data.data;
     console.log(this.menu_data);
    },err=>{
      this.user.dismiss();
      console.log(err)
    })
     
    
  }
  chef_prof_res;
  chef_name:any;
  chef_pro_img:any;
  chef_specialisation:any;
  chefProfileGet(chef_id){
this.auth.getSingleChefData(chef_id).subscribe((data)=>{
this.chef_prof_res=data;
console.log(this.chef_prof_res.data);
this.chef_name=this.chef_prof_res.data.firstname+this.chef_prof_res.data.lastname;
this.chef_pro_img=this.chef_prof_res.data.prof_image;
this.chef_specialisation=this.chef_prof_res.data.specialization;
},err=>{
  console.log(err)
})
  }
}
