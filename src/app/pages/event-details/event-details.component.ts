import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
 
  @Input() ev_data:any;
  constructor(private modalController: ModalController,
              public auth: AuthService,
    public user:UserService) {
    this.user.menu();
    this.ev_data;
   }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    console.log(this.ev_data);
    this.eventsDetails();
  }

  event_detailRes:any;
  event_detailsData:any;
  event_image:any;
  eventsDetails(){
    this.user.present('');
    this.auth.getSingleEvents(this.ev_data).subscribe((data)=>{
      this.event_detailRes=data;
      this.event_detailsData= this.event_detailRes.data;
      this.event_image=this.event_detailsData.event_image;
      console.log(data)
this.user.dismiss();
    },err=>{
      
      this.user.dismiss();
      console.log(err)
    })
  }
  dismiss() {
    this.modalController.dismiss({
      // 'dismissed': true
    });
  }
}
