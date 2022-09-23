import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { BlogdetailsComponent } from '../blogdetails/blogdetails.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  constructor(public modalCtrl: ModalController,
    public auth: AuthService,
    public router: Router,
    public user: UserService) { 
      this.blogMainData();
      this.user.menu();
    }
bl:string="India Food Forum Mumbai";
  ngOnInit() {}
  blogRes;
  blogDataAll;
  blogMainData(){
    this.auth.getAllBlogs().subscribe((data)=>{
      this.blogRes=data;
      this.blogDataAll=this.blogRes.data;
      console.log(this.blogDataAll);
    },err=>{
      console.log('blog error..')
    })
  }
  blogSingleRes;
  blogSingleData;
  async showBlogModal(blog) { 
    let id=blog.id;
    console.log(id)
    this.blogSingleData="";
     this.auth.getSingleBlogs(id).subscribe(async res=>{
       
       this.blogSingleRes=res;
       console.log(this.blogSingleRes)
       this.blogSingleData=this.blogSingleRes.data;
       console.log(this.blogSingleData);
       const modal = await this.modalCtrl.create({  
        component: BlogdetailsComponent  ,
        componentProps: {blogname: this.blogSingleData}
      });  
      return await modal.present();  
     },err=>{
       console.log(err)
     })
  
  }  

}
