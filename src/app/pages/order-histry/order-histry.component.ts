import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-histry',
  templateUrl: './order-histry.component.html',
  styleUrls: ['./order-histry.component.scss'],
})
export class OrderHistryComponent implements OnInit {

  constructor(public auth: AuthService,
             public user: UserService,
             public router: Router) { 
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
  console.log(order);
    },err=>{
      this.user.dismiss();
      console.log(err)
    })
  }
}
