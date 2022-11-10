import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addedevent-details',
  templateUrl: './addedevent-details.component.html',
  styleUrls: ['./addedevent-details.component.scss'],
})
export class AddedeventDetailsComponent implements OnInit {

  @Input() event_data: any;
  constructor(private modalController: ModalController,
    public auth: AuthService,
    public user: UserService) {
    this.user.menu();
    this.event_data;
  }
  event_image:any;
  date;
  intro;
  location;
  title;
  firstname;
  slideOpts={

  }
  ngOnInit() {}
  ionViewWillEnter() {
    console.log(this.event_data);
    this.event_image = this.event_data.event_image;
    this.date = this.event_data.date;
    this.location = this.event_data.location;
    this.firstname = this.event_data.firstname;
    this.intro = this.event_data.intro;
    this.title = this.event_data.title;
  }

  getImage(imgPath:any){
    const endPath= imgPath;
    if(endPath==undefined|| endPath.length==0){
      return '../../../assets/img/user_icon.png';
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
