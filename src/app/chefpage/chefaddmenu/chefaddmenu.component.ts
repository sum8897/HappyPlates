import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-chefaddmenu',
  templateUrl: './chefaddmenu.component.html',
  styleUrls: ['./chefaddmenu.component.scss'],
})
export class ChefaddmenuComponent implements OnInit {
  croppedImagePath = "";
  constructor(public user: UserService,
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private file: File) { 
    this.user.menu();
  }

  ngOnInit() {}

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
    // alert(this.croppedImagePath);
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
  selectedRadioGroup: any;
  radioGroupChange(event: any) {
    console.log("radioGroupChange", event.detail.value);
    this.selectedRadioGroup = event.detail.value;
  }
  menulist: any;
  onMenuSubmit(contactMenuForm: any) {
    alert(typeof (this.user.chef_id));
    console.log(contactMenuForm.value);
    this.menulist = contactMenuForm.value;
    console.log("form" + JSON.stringify(contactMenuForm.value));
    let menuList = {
      userId: (this.user.chef_id).toString(),
      title: contactMenuForm.value.foodname,
      description: contactMenuForm.value.details,
      price: contactMenuForm.value.regular_price,
      media_files: this.multipleImageArray
    }
    console.log(menuList);
    this.auth.uploadMenulist(menuList).subscribe(res => {
      console.log(JSON.stringify(res));
      this.user.showToast('Menu Uploaded Successfully...');
    }, err => {
      console.log(err)
    })
    contactMenuForm.reset();
  }

}
