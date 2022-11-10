import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss'],
})
export class BlogdetailsComponent implements OnInit {
@Input() blogname:any;

blogs_image:any;
intro:any;
title:any;
date:any;
description:any;
  constructor(public modalCtrl: ModalController) { 
    this.blogname;
   
  }

  ngOnInit() {

  }
  ionViewWillEnter(){
    console.log(this.blogname);
    this.title=this.blogname.title;
    this.blogs_image=this.blogname.blogs_image;
    this.date=this.blogname.date;
    this.description=this.blogname.description;
    this.blogs_image=this.blogname.blogs_image;
    this.intro=this.blogname.intro;
    console.log(this.blogs_image);
  }
  getblogImage(imgPath:any){
    const endPath= imgPath;
    if(endPath=="" || endPath.length==0){
      return '../../../assets/img/user_icon.png'
    }
    else{
      return imgPath;
    }
   }
  dismiss(){
this.modalCtrl.dismiss();
  }
}
