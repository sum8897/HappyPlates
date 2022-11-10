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
 event_date:any;
 event_title:any;
 event_location:any;
 event_intro:any;
 slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1,
};
  eventsDetails(){
    this.user.present('');
    this.auth.getSingleEvents(this.ev_data).subscribe((data)=>{
      this.user.dismiss();
      this.event_detailRes=data;
      this.event_detailsData= this.event_detailRes.data;
      this.event_image=this.event_detailsData.event_image;
      console.log(data);   
        this.event_date=this.event_detailsData.date;
        this.event_image= this.event_detailsData.event_image;
        this.event_title= this.event_detailsData.title;
        this.event_location=this.event_detailsData.location;
      this.event_intro= this.event_detailsData.intro;
      console.log(this.event_image)
    },err=>{
      
      this.user.dismiss();
      console.log(err)
    })
  }
  getblogImage(imgPath:any){
    const endPath= imgPath;
    if(endPath=="" || endPath==undefined){
      return '../../../assets/img/user_icon.png'
    }
    else{
      return imgPath;
    }
   }
  dismiss() {
    this.modalController.dismiss({
      // 'dismissed': true
    });
  }
}
