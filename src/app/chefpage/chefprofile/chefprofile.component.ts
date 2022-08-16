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
 
imagepath:any="";
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
      this.imagepath=imageData;
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

  uploadSingleRes;
  uploadSingleResData;
  multipleImageArray:any=[];
  uploadImage(){
    // alert(this.croppedImagePath);
    let body={
      mediafile: this.croppedImagePath
    };
    this.auth.uploadSingleMenuImage(body).subscribe(res=>{
      this.uploadSingleRes=res;
this.uploadSingleResData=this.uploadSingleRes.data;
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
    },err=>{
      alert(JSON.stringify(err))
      console.log(err.error)
    })
  }
  selectedRadioGroup:any;
  radioGroupChange(event:any) {
    console.log("radioGroupChange",event.detail.value);
    this.selectedRadioGroup = event.detail.value;
  }
menulist:any;
  onMenuSubmit(contactMenuForm:any){
    console.log(contactMenuForm.value);
    this.menulist=contactMenuForm.value;
    console.log("form" + JSON.stringify(contactMenuForm.value));
    let menuList={
      userId:"16",
      title: contactMenuForm.value.foodname,
      description: contactMenuForm.value.details,
      price: contactMenuForm.value.regular_price,
      media_files: this.multipleImageArray
       }
       console.log(menuList);
   this.auth.uploadMenulist(menuList).subscribe(res=>{
     console.log(JSON.stringify(res));
   },err=>{
     console.log(err)
   })
    contactMenuForm.reset();
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
