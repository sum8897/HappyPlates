import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss'],
})
export class BlogdetailsComponent implements OnInit {
@Input() blogname:any;
  constructor(public modalCtrl: ModalController) { 
    this.blogname;
   
  }

  ngOnInit() {

  }
  ionViewWillEnter(){
    console.log(this.blogname);
  }
  dismiss(){
this.modalCtrl.dismiss();
  }
}
