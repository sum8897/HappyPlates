import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss'],
})
export class CartpageComponent implements OnInit {

  constructor(public user:UserService,
              public auth: AuthService) {
    this.user.menu();
    this.getcartItem();
   }

  ngOnInit() { }
  increaseItem(data) {
   data.count++;
   console.log(data);
  }
  decreaseItem(data) {
    console.log(data);
    if(data.count<1){
     data.count=1;
    }
    if(data.count >1) {
   data.count--;

    }
  }

  removeCartItem(data){
    console.log(data);
 const items=this.cartArray.filter(item=>item.id===data.id);
 const index=this.cartArray.indexOf(items[0]);
 if(index > -1){
   this.cartArray.splice(index,1);
 }
    console.log(this.cartArray);
    // if(this.cartArray=[]){
    //   console.log('No Item available in your cart..');
    // }
  }

  getcartItem(){
    this.auth.getCart().subscribe((data)=>{
      console.log(data)
    },err=>{
      console.log(err.error)
    })
  }

  cartArray = [
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
