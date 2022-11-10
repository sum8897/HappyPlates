
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { AddedblogDetailsComponent } from '../addedblog-details/addedblog-details.component';

@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.scss'],
})
export class AddBlogsComponent implements OnInit {

  dataRes:any;
  dataList:any;
  blogsListLength:any;
  showPicker=false;
  dateValue=format(new Date(),'dd/MM/yyyy')+'T05:00:00.000Z';
  formateString='';
  @ViewChild(IonDatetime) datetime:IonDatetime;
  constructor(private user: UserService,
              private auth: AuthService,
              public common: CommonService,
              public router: Router,
              public modalController: ModalController,) {
              this.user.menu();
               this.setToday();
               console.log(this.user.today);
               this.getAddedBlogsData();
  }

  ngOnInit() { }




formateString_api:any;
setToday(){
  this.formateString = format(parseISO(format(new Date (),'yyyy-MM-dd')+'T09:00:00.000Z'),
                      'dd/MM/yyyy');
                      console.log(this.formateString)
}
dateChanged(value:any){
this.dateValue=value;
this.formateString=format(parseISO(value),'dd/MM/yyyy');
this.formateString_api=format(parseISO(value),'dd/MM/yyyy');
this.showPicker=false;
console.log(this.dateValue);
console.log(this.formateString);
}

  getAddedBlogsData() {
    this.user.present('');
    this.auth.getAddedBlogs().subscribe((blogs) => {
      this.user.dismiss();
      this.dataRes= blogs;
      this.dataList=this.dataRes.data;
      this.blogsListLength=this.dataList.length;
      console.log(this.dataList);
    }, err => {
      this.user.dismiss();
    })
  }

  onAddressSubmit(contactAddressForm: any) {
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));
        let blogs_data = {
          'title': contactAddressForm.value.title,
          'intro': contactAddressForm.value.into,
          'date': this.formateString_api,
          'userId': localStorage.getItem('user_id'),
          'description': contactAddressForm.value.descr,
          'location':'New Delhi',
          'mediaId': this.common.multipleImageArray,
          'status': '1'
        }
        this.user.present('uploading...')
    this.auth.postBlogs(blogs_data).subscribe((data)=>{
      console.log(data);
    this.user.dismiss();
    this.getAddedBlogsData();
    this.user.showToast('Blogs added successfully..');
    },err=>{
      this.user.dismiss();
    })
  }
  async blogDetails(blog:any){
    console.log('event open'+ JSON.stringify(blog))
    const modal = await this.modalController.create({
      component: AddedblogDetailsComponent,
      componentProps: {blog_data: blog}
    });
    return await modal.present();
  }
}
