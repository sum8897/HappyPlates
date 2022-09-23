import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  croppedImagePath = "";
  constructor(private user: UserService,
              private auth: AuthService,
              private router:Router,
              public actionSheetController: ActionSheetController,
              public camera: Camera,
              public modalCtrl: ModalController,) { }

              imagepath:any="";
              pickImage(sourceType:any) {
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
            
              uploadSingleRes:any;
              uploadSingleResData:any;
              multipleImageArray:any=[];
              uploadImage(){
                // alert(this.croppedImagePath);
                let body={
                  mediafile: this.croppedImagePath
                };
                this.user.present('uploading..');
                this.auth.uploadSingleMenuImage(body).subscribe(res=>{
                  this.user.dismiss();
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
                  this.user.dismiss();
                  alert(JSON.stringify(err))
                  console.log(err.error)
                })
              }

              selectedRadioGroup:any;
          radioGroupChange(event:any) {
                console.log("radioGroupChange",event.detail.value);
                this.selectedRadioGroup = event.detail.value;
              }

              food_name:any;
              reg_price:any;
              others_price:any;
              food_type:any;
              descr:any;
              menu_media:any;
              user_id:any;
              menu_id:any;
  menulist:any;
  onMenuSubmit(contactMenuForm:any){
    console.log((this.menu_media).slice(15,35))
    console.log(contactMenuForm.value);
    this.menulist=contactMenuForm.value;
    console.log("form" + JSON.stringify(contactMenuForm.value));
    let menuList={
      userId: (this.user.chef_id).toString(),
      title: this.food_name,
      description: this.descr,
      price: this.reg_price,
      media_files: this.menu_media.slice(15,35)
      // media_files: this.multipleImageArray
       }
       console.log(menuList);
       this.user.present('updating...');
   this.auth.editMenuByChef(menuList,this.menu_id).subscribe(res=>{
     this.user.dismiss();
     console.log(JSON.stringify(res));
     this.dismiss();
     this.user.userDetails();
   },err=>{
    this.user.dismiss();
     console.log(err)
   })
    contactMenuForm.reset();
  }

  dismiss(){
    this.modalCtrl.dismiss();
      }
}
