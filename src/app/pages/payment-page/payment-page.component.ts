import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  defaultSelectedRadio = "upi";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
  constructor(public user: UserService) { }

  ngOnInit() {}

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail.value);
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }

  radio_list = [
    {
      id: '1',
      name: 'card',
      value: 'card',
      text: 'Credit/Debit Card/ ATM Card',
      disabled: false,
      checked: false,
      color: 'dark'
    }, {
      id: '2',
      name: 'UPI',
      value: 'upi',
      text: 'UPI',
      disabled: false,
      checked: true,
      color: 'dark'
    }, 
    {
      id: '3',
      name: 'Wallets',
      value: 'wallets',
      text: 'WalletsCredit',
      disabled: false,
      checked: false,
      color: 'dark'
    },

    {
      id: '4',
      name: 'net',
      value: 'net',
      text: 'Net Banking',
      disabled: false,
      checked: false,
      color: 'dark'
    },
    {
      id: '5',
      name: 'cash',
      value: 'cash',
      text: 'Cash on Delivery',
      disabled: false,
      checked: false,
      color: 'dark'
    },
  ];
}
