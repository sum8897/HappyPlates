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
  addItemClick(){
    let body={
      amount: 760,
      deliverydate:"2022-08-25",
      description: "Added One itmes only",
      qtty: 1,
      menuId:"16"
    }
    this.auth.addCartItem(body).subscribe((item_res)=>{
console.log(item_res)
    },err=>{
      console.log(err)
    })
  }
  decreaseItem(data:any){
    
    if(data.count>1){
      data.count--;
    }
    else{
      data.count=1;
    }
    console.log(data);

  }
  price:any=0;
  increaseItem(data){
    data.count++;
    data.price = this.price+data.price;
    console.log(data)
    if(data.count>0 && data.count<2){
      this.price=data.price;
      console.log(data);
    }
    else{
      this.price=data.price+(data.count)
      console.log(this.price);
    }
  
  }

  menuArray = [
    {
      id: 1,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 500,
      mrp: 700,
      count: 1,
    },
    {
      id: 2,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 100,
      mrp: 300,
      count: 1,
    },
    {
      id: 3,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 250,
      mrp: 600,
      count: 1,
    },
    {
      id: 4,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 850,
      mrp: 375,
      count: 1,
    },
  ]

}
