import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Router } from '@angular/router';

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

  ratingValue5:any=5;
  ratingValue4:any=4;
  ratingValue3:any=3;
  ratingValue2:any=2;
  ratingValue1:any=1;
  constructor(public user: UserService,
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private file: File,
    public router:Router) {
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
      this.user.showToast('Your details updated successfully...');
      this.router.navigateByUrl('nav/chef-home');
      // contactForm.reset();
    }, err => {
      this.user.dismiss();
      console.log(err);
    })
  }
  updateRes: any;
  updateData: any;
  updateAllData: any;
  country_id=1;
  onAddressSubmit(contactAddressForm: any) {
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));

    let body = {
      'firstname': contactAddressForm.value.firstname,
      'lastname': contactAddressForm.value.lastname,
      'email': this.userAllData.email,
      'password': localStorage.getItem('password'),
      'phone': contactAddressForm.value.phone,
      'country': this.country_id,
      'state': this.selectState_id,
      'city': this.cityId,
      'pin': contactAddressForm.value.pin,
      'address': contactAddressForm.value.location,
      'role': localStorage.getItem('user_role'),
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
      // console.log(this.userData);
      this.user.showToast('Your details updated successfully...');
      this.router.navigateByUrl('nav/chef-home');
      // contactAddressForm.reset();
    }, err => {
      this.user.dismiss();
      console.log(err);
    })
  }
  menu_data; menu_data_list;
  menu_Array:any=[];
  chefmenuData(chef_id) {
    this.user.present('wait...');
    this.auth.getSingleChefsAllMenu(chef_id).subscribe((data) => {
      this.user.dismiss();
      this.menu_data = data;
      this.menu_data_list = this.menu_data.data;
      // console.log(this.menu_data_list);
      for(let i=0;i<=this.menu_data_list.length;i++){
        // console.log(this.menu_data_list[i].medias[0]);
        if(this.menu_data_list[i].medias[0]==undefined){
          console.log('empty data');
          this.menu_Array[i]={
            'price':this.menu_data_list[i].price,
            'title':this.menu_data_list[i].title,
            'description':this.menu_data_list[i].description,
            'userId':this.menu_data_list[i].userId,     
            'path': '../../../assets/img/blog_2.jpg',
          }
          console.log(this.menu_Array)
        }else{
          this.menu_Array[i]={
            'price':this.menu_data_list[i].price,
            'title':this.menu_data_list[i].title,
            'description':this.menu_data_list[i].description,
            'userId':this.menu_data_list[i].userId,          
            'path': this.menu_data_list[i].medias[0].path,
          }
        }
        console.log(this.menu_Array);
      }
  // console.log(this.menu_Array);
    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }

  
  imagepath: any = "";
  pickImage(sourceType:any) {
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      this.imagepath = imageData;
      alert(this.croppedImagePath);
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
    alert("body"+JSON.stringify(body));
    this.user.present('uploading..');
    this.auth.uploadSingleMenuImage(body).subscribe(res => {
      this.user.dismiss();
     
      this.uploadSingleRes = res;
     
      this.uploadSingleResData = this.uploadSingleRes.data;
      alert("Done: "+JSON.stringify(this.uploadSingleResData))
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
   alert(JSON.stringify(this.multipleImageArray))
      console.log(JSON.stringify(this.multipleImageArray));
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
  item_categoty:any;
  handleChange(e:any) {
    this.item_categoty=e.detail.value
    console.log('ionChange fired with value: ' + this.item_categoty);
  }
  menulist: any;
  onMenuSubmit(contactMenuForm: any) {
    console.log(this.item_categoty);
    console.log(this.selectedRadioGroup);
    if(this.selectedRadioGroup==undefined){
      alert('Please select Food Type...');
    }
    
    else{
      console.log(contactMenuForm.value);
      this.menulist = contactMenuForm.value;
      console.log("form" + JSON.stringify(contactMenuForm.value));
      let menuList = {
        userId: (this.user.chef_id),
        title: contactMenuForm.value.foodname,
        description: contactMenuForm.value.details,
        price: contactMenuForm.value.regular_price,
        food_type: parseInt(this.selectedRadioGroup),
        category: parseInt(this.item_categoty),
        media_files: this.multipleImageArray
      }
      alert((menuList.category));
      if(menuList.category==undefined){
      alert('Please Select Food Categoty..')
      }else{
        console.log(menuList);
        this.auth.uploadMenulist(menuList).subscribe(res => {
          // console.log(JSON.stringify(res));
          this.router.navigateByUrl('nav/chef-home');
          this.user.showToast('Menu added successfully...');
          // contactMenuForm.reset();
        }, err => {
          console.log(err)
        })
      }
   
      
    }
  }

  userRes: any;
  userData: any;
  userAllData: any;
  user_image:any;
  user_ProfImage:any='';
  userDetails() {
    this.user.present('');
    this.auth.getUserProfile().subscribe((data) => {
      this.user.dismiss();
      this.userRes = data;
      this.userData = this.userRes.data;
      this.userAllData = this.userData[0];
      this.user_image= this.userAllData.prof_image;
      this.specialization = (this.userAllData.specialization).substring(0,20);
      console.log(this.user_image)
      if(this.user_image===""){
        console.log('image not foubd');
        this.user_ProfImage='../../assets/img/user_icon.png';

      }else{
        console.log('image found...');
        this.user_ProfImage= this.user_image;
      }
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

  stateCard = false;
  state_res: any;
  state_data: any;
  stateshow() {
    this.stateCard = true;
    this.stateList();
  }
  cityCard: boolean = false;
  city_data: any;
  city_res: any;
  cityshow() {
    console.log('city show...');
   
    this.cityList(this.selectState_id);
  }
  cityList(state_id: any) {
    console.log(state_id);
    if(state_id==undefined){
      alert('Please you have to select state first...')
    }else{
      this.cityCard = true;
      let body = {
        state_id: state_id,
      }
      this.user.present('');
      this.auth.getCities(body).subscribe(state_data => {
        this.city_res = state_data;
        this.city_data = this.city_res.city;
        this.user.dismiss();
      }, err => {
        this.user.dismiss();
      })
    }
 
  }
  cityname:any;
  cityId:any;
  selectCity(e: any) {
    console.log(e.currentTarget.value.city_name);
    this.cityname = e.currentTarget.value.city_name;
    this.cityId = e.currentTarget.value.id;
    this.cityCard = false;
  }
  selectState_id:any;
  stateList() {
    let body = {
      country_id: 1,
    }
    this.user.present('');
    this.auth.getState(body).subscribe(state_data => {
      this.stateCard=true;
      this.state_res = state_data;
      this.state_data = this.state_res.state;
      this.user.dismiss();
    }, err => {
      this.user.dismiss();
    })
  }
  statename: any
  selectState(e: any) {
    console.log(e.currentTarget.value.state_name);
    this.statename = e.currentTarget.value.state_name;
    this.selectState_id = e.currentTarget.value.id;
    this.stateCard = false;
  }
}
