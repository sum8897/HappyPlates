import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {

  constructor(public auth:AuthService,
             public user:UserService) { 
              this.user.menu();
             }

  ngOnInit() {}
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    
    // slidesPerColumn: 1,
    // slidesPerGroup: 1,
    // watchSlidesProgress: true,
    // resistanceRatio: 0,
    // spaceBetween: 10,
  };

  chefImg=[
    {
      id:1,
      img: '../../assets/img/chef_1.jpg',
     },
     {
      id:2,
      img: '../../assets/img/chef_2.jpg',
     },
     {
      id:3,
      img: '../../assets/img/chef_3.jpg',
     },

  ]
}
