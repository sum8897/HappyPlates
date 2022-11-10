import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-addedblog-details',
  templateUrl: './addedblog-details.component.html',
  styleUrls: ['./addedblog-details.component.scss'],
})
export class AddedblogDetailsComponent implements OnInit {
  blogs_image: any;
  date: any;
  description: any;
  firstname: any;
  intro: any;
  title: any;

  @Input() blog_data: any;
  constructor(private modalController: ModalController,
    public auth: AuthService,
    public user: UserService) {
    this.user.menu();
    this.blog_data;
  }

  ngOnInit() { }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    
  };
  ionViewWillEnter() {
    console.log(this.blog_data);
    this.blogs_image = this.blog_data.blogs_image;
    this.date = this.blog_data.date;
    this.description = this.blog_data.description;
    this.firstname = this.blog_data.firstname;
    this.intro = this.blog_data.intro;
    this.title = this.blog_data.title;
  }

  dismiss() {
    this.modalController.dismiss({
      // 'dismissed': true
    });
  }
}
