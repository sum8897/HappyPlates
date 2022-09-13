import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chef-menu-review',
  templateUrl: './chef-menu-review.component.html',
  styleUrls: ['./chef-menu-review.component.scss'],
})
export class ChefMenuReviewComponent implements OnInit {
  type: string;
  menu = true;
  chef = false;
  menu_data;
  menu_data_list;
  constructor(private user: UserService,
    public auth: AuthService,
    public platform: Platform,
    public router:Router) {
    //  this.menuData();
    this.user.menu();
    console.log(this.user.chef_id.id);
    this.chefProfileGet(this.user.chef_id.id);
    this.menuData(this.user.chef_id.id);
  }
  ionViewWillEnter() {


  }
  ngOnInit() {
    if (this.user.chefMenuType == "" || this.user.chefMenuType == [] || this.user.chefMenuType == undefined) {
      this.type = 'menu';
      this.menu = true;
      this.chef = false;
    } else {
      this.type = this.user.chefMenuType;
      console.log(this.type);
      if (this.type == 'menu') {
        this.menu = true;
        this.chef = false;
      } else {
        this.menu = false;
        this.chef = true;
      }
    }

  }
  segmentChanged(ev: any) {
    this.type = ev.detail.value;
    if (this.type == 'menu') {
      this.menu = true;
      this.chef = false;
      this.menuData(this.user.chef_id.id);
      let body = {
        fname: "ashish",
        lname: "chaurasiya",
      }
    } else {
      this.menu = false;
      this.chef = true;
    }
    console.log('Segment changed', this.type);
  }
  menuData(chef_id) {
    this.user.present('wait...');
    this.auth.getSingleChefsAllMenu(chef_id).subscribe((data) => {
      this.user.dismiss();
      this.menu_data = data;
      this.menu_data_list = this.menu_data.data;
      console.log(this.menu_data_list);

    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }
  displaySingleMenu(menu) {
    this.user.present('details..');
    this.auth.getSingleMenuDetails(menu.id).subscribe((data) => {
      this.user.dismiss();
      console.log(data)
    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }
  chef_prof_res: any;
  chef_name: any;
  chef_pro_img: any;
  chef_specialisation: any;
  chefProfileGet(chef_id: any) {
    this.auth.getSingleChefDataProfile(chef_id).subscribe((data) => {
      this.chef_prof_res = data;
      console.log(this.chef_prof_res.data);
      this.chef_name = this.chef_prof_res.data.firstname + this.chef_prof_res.data.lastname;
      this.chef_pro_img = this.chef_prof_res.data.prof_image;
      this.chef_specialisation = this.chef_prof_res.data.specialization;
    }, err => {
      console.log(err)
    })
  }
  addItemClick(menu_data: any) {
    let body = {
      amount: menu_data.counter * menu_data.price,
      deliverydate: "2022-09-02",
      description: "Added One itmes only",
      qtty: menu_data.counter,
      menuId: menu_data.id
    }
    console.log(body)
    this.user.present('');
    this.auth.addCartItem(body).subscribe((item_res) => {
      this.router.navigateByUrl('/nav/cart')
      this.user.dismiss();
      console.log(item_res);
    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }




  price: any = 0;
  increaseItem(data: any) {
    data.counter++;
    // data.tprice = data.bprice*data.counter;
    console.log(data)
    // if(data.count>0 && data.count<2){
    //   this.price=data.price;
    //   console.log(data);
    // }
    // else{
    //   this.price=data.price+(data.count)
    //   console.log(this.price);
    // }

  }
  decreaseItem(data: any) {

    if (data.counter > 1) {
      data.counter--;
      // data.tprice = data.bprice*data.count;
      console.log(data)
    }
    else {
      data.counter = 0;
      // data.tprice = 0;
    }
    console.log(data);

  }

  menuArray = [
    {
      id: 1,
      name: 'Spcicy Prawns with Sweet Dipping',
      bprice: 500,
      tprice: 0,
      mrp: 700,
      count: 0,
    },
    {
      id: 2,
      name: 'Spcicy Prawns with Sweet Dipping',
      bprice: 100,
      tprice: 0,
      mrp: 300,
      count: 0,
    },
    {
      id: 3,
      name: 'Spcicy Prawns with Sweet Dipping',
      bprice: 250,
      tprice: 0,
      mrp: 600,
      count: 0,
    },
    {
      id: 4,
      name: 'Spcicy Prawns with Sweet Dipping',
      bprice: 850,
      tprice: 0,
      mrp: 375,
      count: 0,
    },
  ]

}
