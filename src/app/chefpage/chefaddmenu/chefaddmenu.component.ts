import { EditmenuComponent } from './../editmenu/editmenu.component';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chefaddmenu',
  templateUrl: './chefaddmenu.component.html',
  styleUrls: ['./chefaddmenu.component.scss'],
})
export class ChefaddmenuComponent implements OnInit {
  selectedCategory_id:any;
  constructor(public user: UserService,
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private file: File,
    public modalCtrl: ModalController,
    public router:Router) { 
    this.user.menu();
  }

  ngOnInit() {}

  croppedImagePath = "";
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
  imageData:any;
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
      this.imageData=this.uploadSingleResData.filename;
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
  item_categoty:any;
  handleChange(e:any) {
    this.item_categoty=e.detail.value
    console.log('ionChange fired with value: ' + this.item_categoty);
  }
 
  menulist: any;
  onMenuSubmit(contactMenuForm: any) {
    // alert(typeof (this.user.chef_id));
    console.log(contactMenuForm.value);
    this.menulist = contactMenuForm.value;
    console.log("form" + JSON.stringify(contactMenuForm.value));
    if(contactMenuForm.value.foodname=="" || contactMenuForm.value.regular_price=="" || contactMenuForm.value.details==""){
      alert('Please fill all detaills');
    }
   else if(this.selectedRadioGroup==undefined){
      alert('Please select Food Type...');
    }
    else if(this.item_categoty==undefined){
      alert('Please Select Food Categoty..')
    }else{
      let menuList = {
        userId: (this.user.chef_id).toString(),
        title: contactMenuForm.value.foodname,
        description: contactMenuForm.value.details,
        price: contactMenuForm.value.regular_price,
        food_type: parseInt(this.selectedRadioGroup),
        category: parseInt(this.item_categoty),
        media_files: this.multipleImageArray
      }
      
          console.log(menuList);
  
          this.user.present('uploading...');
          this.auth.uploadMenulist(menuList).subscribe(res => {
            this.user.dismiss();
            console.log(JSON.stringify(res));
            this.router.navigate(['nav/chef-home']);
            this.user.showToast('Menu added successfully...');
          }, err => {
            this.user.dismiss();
            // alert('Somethings went wrong,Please try after sometimes.');
            alert(JSON.stringify(err.errors));
            console.log(err)
          })
    }
   
      
   

  }
  async editMenu(menu_data_list_all:any){
    console.log(menu_data_list_all);
    const modal = await this.modalCtrl.create({  
      component:   EditmenuComponent,
      componentProps: {menu_data_list_all: menu_data_list_all}
    });  
    return await modal.present();  
  }
  deleteMenu(menu:any){
    console.log(menu);
    this.user.present('deleting');
    this.auth.deleteMenuByChef(menu.id).subscribe((response)=>{
    this.user.dismiss();
    const items = this.user.menu_data_list.filter(item => item.id === menu.id);
    const index = this.user.menu_data_list.indexOf(items[0]);
    if (index > -1) {
      this.user.menu_data_list.splice(index, 1);
    }
    console.log(this.user.menu_data_list);
    console.log(this.user.menu_data_list.length);
    alert('Menu Deleted successfully.')
    },err=>{
      console.log(err.errors);
      alert(JSON.stringify(err.errors))
      this.user.dismiss();
    })
  }
}
