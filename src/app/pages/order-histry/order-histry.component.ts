import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-histry',
  templateUrl: './order-histry.component.html',
  styleUrls: ['./order-histry.component.scss'],
})
export class OrderHistryComponent implements OnInit {

  constructor(public auth: AuthService,
             public user: UserService,
             public router: Router,
             private modalController: ModalController,) { 
               this.orderHistory()
             }

  ngOnInit() {}
orderedRes:any;
orderedData:any;

  orderHistory(){
    this.user.present('..');
    this.auth.orderHistroty().subscribe((order)=>{
      this.orderedRes=order;
      this.orderedData=this.orderedRes.data;
      this.user.dismiss();
  console.log(this.orderedData);
  if(this.orderedData=="" || this.orderedData.length==0 || this.orderedData==[]){
    console.log('no data found')
  }else{
    var mydate = new Date(this.orderedData[0].deliverydate);
    console.log(mydate.toDateString());
      if(this.orderedData.length==0){
        console.log('empty data')
      }else{
        console.log('Not Empty ')
      }
  }

    },err=>{
      this.user.dismiss();
      console.log(err)
    })
  }


 async viewOrderDetails(ev:any){
  console.log((ev))
 const modal = await this.modalController.create({
   component: OrderDetailsComponent,
   componentProps: {ev_data: ev}
 });
 return await modal.present();
 }
}
