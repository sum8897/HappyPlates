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
  constructor(public user: UserService,
             public auth:AuthService,
             public actionSheetController: ActionSheetController,
             public camera: Camera,
    private file: File,) { 
    this.user.menu();
  }

  ngOnInit() {}
  onSubmit(contactForm:any) {
    // localStorage.setItem('user_role', 'customer');
    // this.router.navigateByUrl('/nav/mainpage')
    console.log(contactForm.value);
    console.log("form" + JSON.stringify(contactForm.value));
    contactForm.reset();
  }
  onAddressSubmit(contactAddressForm:any){
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));
    contactAddressForm.reset();
  }
  onMenuSubmit(contactMenuForm:any){
    console.log(contactMenuForm.value);
    console.log("form" + JSON.stringify(contactMenuForm.value));
    contactMenuForm.reset();
  }
  selectedRadioGroup:any;
  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail.value);
    this.selectedRadioGroup = event.detail.value;
  }

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
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        icon:'folder',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        icon:'camera',
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



  menuData=[
    {
      id:1,
      title:'Spicy Prawans with Sweet Dipping',
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
