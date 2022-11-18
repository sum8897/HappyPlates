
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { AddedblogDetailsComponent } from '../addedblog-details/addedblog-details.component';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Alert } from 'selenium-webdriver';

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
              public modalController: ModalController,
              public actionSheetController: ActionSheetController,
              public camera: Camera,) {
                this.getAddedBlogsData();
              this.user.menu();
               this.setToday();
               console.log(this.user.today);
               
  }

  ngOnInit() { }

  ionViewWillEnter(){
    this.getAddedBlogsData();
  }
  croppedImagePath: any;
  imagepath: any = "";
  pickImage(sourceType:any) {
    const options: CameraOptions = {
      quality: 20,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // alert(imageData);
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      this.imagepath = imageData;
      // alert(JSON.stringify(this.croppedImagePath));

    }, (err) => {
      alert(JSON.stringify(err));
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        icon: 'folder',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  uploadSingleRes:any;
  uploadSingleResData:any;
  multipleImageArray: any = [];
  imageData:any='';
  img:any;
  uploadImage() {
    this.imageData='';
    this.img='';
    let body = {
      // mediafile: this.capturedSnapURL
      mediafile: this.croppedImagePath
    };
    this.user.present('uploading...');
    this.auth.uploadSingleMenuImage(body).subscribe(res => {
      this.user.dismiss();
      this.uploadSingleRes = res;
      this.uploadSingleResData = this.uploadSingleRes.data;
      // this.multipleImageArray.push(this.uploadSingleResData.filename);
      this.imageData=this.uploadSingleResData.filename;
      this.img=this.imageData;

      // alert(JSON.stringify(this.uploadSingleResData));
      // alert(JSON.stringify(this.imageData));
    
    }, err => {
      this.user.dismiss();
      alert(JSON.stringify(err))
      console.log(err.error)
    })
  }

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
    this.user.present('...');
    this.auth.getAddedBlogs().subscribe((blogs) => {
      this.user.dismiss();
      this.dataRes= blogs;
      this.dataList=this.dataRes.data;
      this.blogsListLength=this.dataList.length;
      // console.log(this.dataList);
    }, err => {
      this.user.showToast('Something went wrong.Please try after sometimes...');
      this.user.dismiss();
    })
  }

  onAddressSubmit(contactAddressForm: any) {
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));
        let blogs_data = {
          'title': contactAddressForm.value.title,
          'intro': contactAddressForm.value.into,
          'date': this.formateString,
          'userId': localStorage.getItem('user_id'),
          'description': contactAddressForm.value.descr,
          'location':'New Delhi',
          'blog_images': this.imageData,
          'status': '1'
        }
        this.user.present('uploading...');
    this.auth.postBlogs(blogs_data).subscribe((data)=>{
      // console.log(data);
    this.user.dismiss();
    this.router.navigateByUrl('nav/chef-home');
    // this.getAddedBlogsData();
    this.user.showToast('Blogs added successfully..');
    },err=>{
      alert(JSON.stringify(err))
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
