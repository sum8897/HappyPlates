import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  @Input() ev_data:any;
  constructor(private modalController: ModalController,
              public auth: AuthService,
    public user:UserService) {
    this.user.menu();
    this.ev_data;
   }

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss({
      // 'dismissed': true
    });
  }
}
