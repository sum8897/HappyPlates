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
               this.menuData();
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
      this.menuData()
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
  menuData(){
    this.user.present('wait...');
    this.auth.getMenuData().subscribe((data)=>{
     this.user.dismiss();
     this.menu_data=data;
     this.menu_data_list=this.menu_data.data;
     console.log(this.menu_data);
    }),err=>{
      this.user.dismiss();
    }
  }
}
