import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EditmenuComponent } from '../editmenu/editmenu.component';

@Component({
  selector: 'app-chef-home',
  templateUrl: './chef-home.component.html',
  styleUrls: ['./chef-home.component.scss'],
})
export class ChefHomeComponent implements OnInit {

  constructor(public user: UserService,
              public auth: AuthService,
              public modalCtrl: ModalController,
              public router: Router,) {
    this.user.menu();
    this.user.userDetails();
    this.allOrders();
  }

  ngOnInit() { }
allRes;
allOrderedData:any;
allorderedDataList:any;
  allOrders() {
    // this.user.present('');
    this.auth.getChefOrders().subscribe((data) => {
      // this.user.dismiss();
      this.allRes=data;
      this.allOrderedData=data;
      this.allorderedDataList=this.allOrderedData.data;
      console.log(this.allorderedDataList);
      if(this.allorderedDataList.length==0){
        console.log('empty')
      }
    },err => {
      // this.user.dismiss();
      console.log(err)
    })
  }
  async editMenu(menu_data_list_all:any){
    console.log(menu_data_list_all);
    const modal = await this.modalCtrl.create({  
      component:   EditmenuComponent,
      componentProps: {menu_data_list_all: menu_data_list_all}
    });  
    return await modal.present();  
  }
  deleteMenu(menu:any){
    this.user.present('deleting');
    this.auth.deleteMenuByChef(menu.id).subscribe((response)=>{
    this.user.dismiss();
    const items = this.user.menu_data_list.filter(item => item.id === menu.id);
    const index = this.user.menu_data_list.indexOf(items[0]);
    if (index > -1) {
      this.user.menu_data_list.splice(index, 1);
    }
    console.log(this.user.menu_data_list);
    console.log(this.user.menu_data_list.length)
    },err=>{
      this.user.dismiss();
    })
  }
  addMenu(){
    this.router.navigateByUrl('/nav/chef-profile')
  }
  orderDData = [
    {
      id: 1,
      orderId: 7659876,
      ItemName: 'Chichen Currey',
      address: '09, Ashok nagar Naini Allahabad UP 231211',
      contact: 9876543287,
      ordered_date: '02-09-2022',
      delivery_date: '23-09-2022',
      price: 879.00,
    },
    {
      id: 2,
      orderId: 7659897,
      ItemName: 'OnionPizza ',
      address: '09, Ashok nagar Naini Allahabad UP 231211',
      contact: 9876543287,
      ordered_date: '02-09-2022',
      delivery_date: '23-09-2022',
      price: 879.00,
    },
    {
      id: 3,
      orderId: 7659897,
      ItemName: 'OnionPizza ',
      address: '09, Ashok nagar Naini Allahabad UP 231211',
      contact: 9876543287,
      ordered_date: '02-09-2022',
      delivery_date: '23-09-2022',
      price: 879.00,
    },

  ]
}
