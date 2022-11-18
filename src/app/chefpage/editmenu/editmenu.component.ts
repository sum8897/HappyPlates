import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';


@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.scss'],
})
export class EditmenuComponent implements OnInit {
  @Input() menu_data_list_all:any;
  selectedCategory_id:any;
  constructor(public modalCtrl: ModalController,
             public common:CommonService,
             public user: UserService,
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private file: File) { 
              
             }

  ngOnInit() {

    
  }
  menu_image:any;
  ionViewWillEnter(){
    this.croppedImagePath='';
    this.common.food_name=this.menu_data_list_all.title;
    this.common.reg_price=this.menu_data_list_all.price;
    this.common.others_price=this.menu_data_list_all.price;
    this.selectedCategory_id=this.menu_data_list_all.category.id;
    this.selectedFoodCategory_id= this.menu_data_list_all.food_type;
    this.common.descr=this.menu_data_list_all.description;
    this.common.menu_media=this.menu_data_list_all.path;
    this.croppedImagePath=this.menu_data_list_all.path;
    console.log(this.croppedImagePath);
    this.common.croppedImagePath='http://103.139.58.242/~clientpro/amantran/public'+this.common.menu_media;
    this.common.menu_id=this.menu_data_list_all.id;
    console.log(this.common.croppedImagePath);
  }
  selectedValue=2;
cat_data=[
  {
    id:1,
    value:1,
    name:'Punjabi',
  },
  {
    id:2,
    value:2,
    name:'Gujrati',
  },
  {
    id:3,
    value:3,
    name:'North Indian',
  },
  {
    id:4,
    value:4,
    name:'South Indian',
  },
  {
    id:5,
    value:5,
    name:'Chicken Tikka',
  },
]
foodType_data=[
  {
    id:1,
    value:1,
    name:'Veg'
  },
  {
    id:2,
    value:2,
    name:'No Veg'
  },
]
selectedFoodCategory_id:any;
foodChange(e:any) {
  this.selectedFoodCategory_id=e.detail.value
  console.log('ionChange fired with value: ' + this.selectedFoodCategory_id);
}
  handleChange(e:any) {
    this.selectedCategory_id=e.detail.value
    console.log('ionChange fired with value: ' + this.selectedCategory_id);
  }

  onMenuSubmit(contactMenuForm:any){
  console.log(contactMenuForm.value);
  }
  croppedImagePath = "";
  imagepath: any = "";
  pickImage(sourceType:any) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      this.imagepath = imageData;
    }, (err) => {
      // Handle error
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
  uploadImage() {
    let body = {
      mediafile: this.croppedImagePath
    };
    this.user.present('uploading..');
    this.auth.uploadSingleMenuImage(body).subscribe(res => {
      this.user.dismiss();
      this.uploadSingleRes = res;
      this.uploadSingleResData = this.uploadSingleRes.data;
      this.multipleImageArray.push(this.uploadSingleResData.filename)

      console.log(this.multipleImageArray);
    }, err => {
      this.user.dismiss();
      alert(JSON.stringify(err))
      console.log(err.error)
    })
  }

  submitMenu(){
  console.log(this.common.food_name);
  console.log(this.common.reg_price);

 console.log(this.selectedCategory_id);
console.log(this.common.descr)
  }


  dismiss(){
    this.modalCtrl.dismiss();
      }

  
}
