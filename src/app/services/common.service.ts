import { PolicyComponent } from './../pages/policy/policy.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  croppedImagePath = "";
  imageData:any='';
  uploadSingleRes:any;
  uploadSingleResData:any;
  multipleImageArray: any = [];
  img:any;
  imagepath:any="";
  cameraSelect:any;
  gallerySelect:any;
  selectedRadioGroup:any;
  food_name:any;
  reg_price:any;
  others_price:any;
  food_type:any='1';
  descr:any;
  menu_media:any;
  user_id:any;
  menu_id:any;
  menulist:any;

  stateCard = false;
  state_res: any;
  state_data: any;
  selectState_id;
  statename: any
  cityCard: boolean = false;
  city_data: any;
  city_res: any;
  cityname: any;
  cityId: any;
  constructor(public user: UserService,
              public auth: AuthService,
              public router: Router,
              public actionSheetController: ActionSheetController,
              public camera: Camera,
              public modalCtrl: ModalController,
              public androidPermissions: AndroidPermissions ) { }

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
            
              pickImage(sourceType:any) {
                this.imagepath='';
                const options: CameraOptions = {
                  quality: 20,
                  sourceType: sourceType,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE
                }          
                this.camera.getPicture(options).then((imageData) => {
                  this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
                  this.imagepath = imageData;
                  this.uploadImage();
                }, (err) => {
                  alert(JSON.stringify(err));
                  // Handle error
                });
              }           
 
              uploadImage() {
                this.imageData='';
                this.img='';
                let body = {
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
                }, err => {
                  this.user.dismiss();
                  alert(JSON.stringify(err))
                  console.log(err.error)
                })
              }

              radioGroupChange(event:any) {
                this.selectedRadioGroup = event.detail.value;
              }
      
            onMenuSubmit(contactMenuForm:any){
    this.menulist=contactMenuForm.value;
    let menuList={
      userId: (this.user.chef_id).toString(),
      title: this.food_name,
      description: this.descr,
      price: this.reg_price,
      media_files: this.menu_media.slice(15,35)
       }
       this.user.present('updating...');
   this.auth.editMenuByChef(menuList,this.menu_id).subscribe(res=>{
     this.user.dismiss();
     this.dismiss();
     this.user.userDetails();
   },err=>{
    this.user.dismiss();
     console.log(err)
   })
    contactMenuForm.reset();
             }

            async openPolicy(){
     const modal = await this.modalCtrl.create({
    component: PolicyComponent,
    cssClass: 'my-custom-class',
    componentProps: { policydata: 'policy'}
  });
  return await modal.present();
            }

          dismiss(){
           this.modalCtrl.dismiss();
         }

         clickLogin() {
          this.router.navigate(['/loginpage'])
        }
      
         stateshow() {
          this.stateCard = true;
          this.stateList();
        }
      
        stateList() {
          let body = {
            country_id: 1,
          }
          this.user.present('loading states...');
          this.auth.getState(body).subscribe(state_data => {
            this.state_res = state_data;
            this.state_data = this.state_res.state;
            console.log(this.state_data);
            this.user.dismiss();
          }, err => {
            this.user.dismiss();
          })
        }
      
        selectState(e: any) {
          console.log(e.currentTarget.value.state_name);
          this.statename = e.currentTarget.value.state_name;
          this.selectState_id = e.currentTarget.value.id;
          this.stateCard = false;
        }
      
        cityshow() {
          console.log('city show...');
          this.cityList(this.selectState_id);
        }
        cityList(state_id: any) {
          console.log(state_id);
          if (state_id == undefined) {
            alert('You have to select State first.');
          } else {
            let body = {
              state_id: state_id,
            }
            this.user.present('loading cities...');
            this.auth.getCities(body).subscribe(state_data => {
              this.city_res = state_data;
              this.city_data = this.city_res.city;
              this.cityCard = true;
              this.user.dismiss();
            }, err => {
              this.user.dismiss();
              alert('Something went wrong, Please try afetr sometimes.')
            })
          }
      
        }
        selectCity(e: any) {
          console.log(e.currentTarget.value.city_name);
          this.cityname = e.currentTarget.value.city_name;
          this.cityId = e.currentTarget.value.id;
          this.cityCard = false;
        }
}
