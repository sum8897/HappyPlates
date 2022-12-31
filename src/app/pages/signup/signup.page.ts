import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  type: string;
  customer = true;
  chef = false;
  constructor() { }

  ngOnInit() {
    this.type = 'customer';
  }
  segmentChanged(ev: any) {
    this.type = ev.detail.value;
    if (this.type == 'customer') {
      this.customer = true;
      this.chef = false;
    } else {
      this.customer = false;
      this.chef = true;
    }
    console.log('Segment changed', this.type);
  }
}
