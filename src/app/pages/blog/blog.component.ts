import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BlogdetailsComponent } from '../blogdetails/blogdetails.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }
bl:string="India Food Forum Mumbai";
  ngOnInit() {}
  async showBlogModal() {  
    const modal = await this.modalCtrl.create({  
      component: BlogdetailsComponent  ,
      componentProps: {blogname: this.bl}
    });  
    return await modal.present();  
  }  

}
