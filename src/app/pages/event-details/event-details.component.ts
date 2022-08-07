import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {

  constructor(private modalController: ModalController,
    public user:UserService) {
    this.user.menu();
   }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      // 'dismissed': true
    });
  }
}
