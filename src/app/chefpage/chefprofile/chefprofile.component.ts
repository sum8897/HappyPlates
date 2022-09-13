import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
@Component({
  selector: 'app-chefprofile',
  templateUrl: './chefprofile.component.html',
  styleUrls: ['./chefprofile.component.scss'],
})
export class ChefprofileComponent implements OnInit {
  croppedImagePath = "";
  specialization: any;
  user_name: any;
  user_location: any;
  constructor(public user: UserService,
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private file: File,) {
    this.user.menu();
    this.userDetails();

  }
  ionViewDidEnter() {
    // this.menuData(this.user.chef_id.id);
  }
  ngOnInit() { }
  onSubmit(contactForm: any) {
    console.log(contactForm.value)

    let body = {
      'firstname': this.userAllData.firstname,
      'lastname': this.userAllData.lastname,
      'email': this.userAllData.email,
      'password': localStorage.getItem('password'),
      'description': contactForm.value.descr,
      'skills': contactForm.value.skills,
      'specialization': contactForm.value.specialization,
    }
    console.log(body)
    this.user.present('');
    this.auth.updateProfileData(body).subscribe((data) => {
      this.user.dismiss();
      console.log(data);
      contactForm.reset();
    }, err => {
      this.user.dismiss();
      console.log(err);
    })
  }
  updateRes: any;
  updateData: any;
  updateAllData: any;
  onAddressSubmit(contactAddressForm: any) {
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));

    let body = {
      'firstname': contactAddressForm.value.firstname,
      'lastname': contactAddressForm.value.lastname,
      'email': this.userAllData.email,
      'password': localStorage.getItem('password'),
      'phone': contactAddressForm.value.phone,
      'city': contactAddressForm.value.city,
      'pin': contactAddressForm.value.pin,
      'address': contactAddressForm.value.location,
    }
    console.log(body)
    this.user.present('');
    this.auth.updateProfileData(body).subscribe((data) => {
      this.user.dismiss();
      this.userRes = data;
      this.userData = this.userRes.data;
      this.user_location = this.userData.address;
      this.user_name = this.userData.firstname + " " + this.userData.lastname;
      this.specialization = this.userData.specialization;
      console.log(this.userData);
      // contactAddressForm.reset();
    }, err => {
      this.user.dismiss();
      console.log(err);
    })
  }
  menu_data; menu_data_list;
  chefmenuData(chef_id) {
    this.user.present('wait...');
    this.auth.getSingleChefsAllMenu(chef_id).subscribe((data) => {
      this.user.dismiss();
      this.menu_data = data;
      this.menu_data_list = this.menu_data.data;
      console.log(this.menu_data_list);

    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }
  imagepath: any = "";
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      this.imagepath = imageData;
      // alert(this.croppedImagePath);
      // console.log(this.croppedImagePath);
      // alert(imageData);
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

  uploadSingleRes;
  uploadSingleResData;
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
      // if(this.multipleImageArray.length=== 0){
      //   this.multipleImageArray.push(this.uploadSingleResData.filename)
      // }else{
      //   for(let i=0;i<this.multipleImageArray.length;i++){
      //     if(this.multipleImageArray[i] !=this.uploadSingleResData.filename){
      //       this.multipleImageArray.push(this.uploadSingleResData.filename)
      //     }else{
      //       return this.multipleImageArray;
      //     }
      //   }
      // }

      console.log(this.multipleImageArray);
      // alert(res)
      // console.log(res);
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
    }, err => {
      console.log(err)
    })
    contactMenuForm.reset();
  }

  userRes: any;
  userData: any;
  userAllData: any;
  userDetails() {
    this.user.present('');
    this.auth.getUserProfile().subscribe((data) => {
      this.user.dismiss();
      this.userRes = data;
      this.userData = this.userRes.data;
      this.userAllData = this.userData[0];
      this.specialization = this.userAllData.specialization;
      this.user_name = this.userAllData.firstname + " " + this.userAllData.lastname;
      this.user_location = this.userAllData.address;
      this.user.chef_id = this.userAllData.id;
      console.log(this.userAllData);
      console.log(this.specialization);
      this.chefmenuData(this.user.chef_id);
    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }


  updatepassRes:any;
  onPasswordSubmit(updatePass: any) {
    console.log(updatePass.value);
    let body = {
      'old_password': updatePass.value.oldpass,
      'new_password': updatePass.value.newpass,
      'confirm_password': updatePass.value.newpassc
    }
    this.user.present('updating...');
    this.auth.passwordUpdate(body).subscribe((data) => {
      this.user.dismiss();
      this.updatepassRes=data;
      // console.log(data);
      this.user.showToast(this.updatepassRes.message)
      updatePass.reset();
    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }
  menuData = [
    {
      id: 1,
      title: 'Spicy Prawans with Sweet Dipping',
      regu: 750,
      offer: 520
    },

    {
      id: 2,
      title: 'Spicy Prawans with Sweet Dipping',
      regu: 1250,
      offer: 720
    },
    {
      id: 3,
      title: 'Spicy Prawans with Sweet Dipping',
      regu: 6550,
      offer: 4220
    },
  ]
}
