import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-testimonial-details',
  templateUrl: './testimonial-details.component.html',
  styleUrls: ['./testimonial-details.component.scss'],
})
export class TestimonialDetailsComponent implements OnInit {
@Input() testimonial_data:any;
datalist:any;
dataRes:any;
testi_name:any;
testi_date:any;
testi_title:any;
testi_location:any;
testi_intro:any;

  constructor(public auth:AuthService,
              public user: UserService,
              public modalController: ModalController,) { }

  ngOnInit() {}
  ionViewWillEnter() {
    this.testimonial_data;
    console.log(this.testimonial_data);
this.getData(this.testimonial_data.id);
  }

  getData(id:any){
 this.user.present('');
    this.auth.getSingleTestimonials(id).subscribe((data)=>{
      this.dataRes=data;
      this.datalist=this.dataRes.data;
      console.log(data);
      this.testi_name=this.datalist.authorName;
      this.testi_date=this.datalist.date;
      this.testi_location=this.datalist.location;
      this.testi_title=this.datalist.title;
      this.testi_intro=this.datalist.intro;
this.user.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err);
    })
  }

  dismiss() {
    this.modalController.dismiss({
      // 'dismissed': true
    });
  }
}
