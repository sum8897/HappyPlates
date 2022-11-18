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
 
  specialization: any;
  user_name: any;
  user_location: any;

  ratingValue5:any=5;
  ratingValue4:any=4;
  ratingValue3:any=3;
  ratingValue2:any=2;
  ratingValue1:any=1;

  chef_about_me:any;
  chef_address:any;
  chef_city_name:any;
  chef_city_id:any;
  chef_state_name:any;
  chef_state_id:any;
  chef_description:any;
  chef_email:any;
  chef_firstname:any;
  chef_id:any;
  chef_lastname:any;
  chef_phone:any;
  chef_pin:any;
  chef_role:any;
  chef_skills:any;
  chef_specialization:any;

  constructor(public user: UserService,
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private file: File,
    public router:Router) {
    this.user.menu();
    this.userDetails();

  }
  ionViewWillEnter() {
    this.userDetails();
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
      'role': localStorage.getItem('user_role'),
      'phone': localStorage.getItem('user_mobile'),
      'description': contactForm.value.descr,
      'skills': contactForm.value.skills,
      'specialization': contactForm.value.specialization,
    }
    console.log(body);
    this.user.present('uploading...');
    this.auth.updateProfileData(body).subscribe((data) => {
      this.user.dismiss();
      console.log(data);
      this.user.showToast('Your details updated successfully...');
      this.router.navigateByUrl('nav/chef-home');
      // contactForm.reset();
    }, err => {
      this.user.showToast(JSON.stringify(err));
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
    if(this.chef_firstname=='' || this.chef_lastname=='' || this.chef_email=='' || this.chef_phone=='' || this.chef_pin=='' || this.user_location==''){
      alert('please fill all required details.')

    }else if((this.chef_phone).toString().length<10 || (this.chef_phone).toString().length>10){
      alert('Please enter valid phone number.');
    }
    else if((this.chef_pin).toString().length<6 || (this.chef_pin).toString().length>6){
  alert('Zip code should be 6 digit only.')
    }
  
    else{
        if(this.selectState_id==undefined){
        this.selectState_id=this.chef_state_id;
       }
       if(this.cityId==undefined){
        this.cityId=this.chef_city_id;
       }
  
      let body = {
        'firstname': this.chef_firstname,
        'lastname': this.chef_lastname,
        'email': this.chef_email,
        'password': localStorage.getItem('password'),
        'phone': this.chef_phone,
        'country': this.country_id,
        'state': this.selectState_id,
        'city': this.cityId,
        'pin': this.chef_pin,
        'address': this.user_location,
        'role': localStorage.getItem('user_role'),
      }
      console.log(body)
      
      this.user.present('Updating...');
      this.auth.updateProfileData(body).subscribe((data) => {
        this.user.dismiss();
        this.userRes = data;
        this.userData = this.userRes.data;
        this.user_location = this.userData.address;
        this.user_name = this.userData.firstname + " " + this.userData.lastname;
        this.specialization = this.userData.specialization;
        this.user.showToast('Your details updated successfully...');
        this.router.navigateByUrl('nav/chef-home');
      }, err => {
        alert('Something went wrong please try after some times.');
        this.user.dismiss();
        console.log(err);
      })
     
    }
   

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

  
  croppedImagePath: any;
  imagepath: any = "";
  pickImage(sourceType:any) {
    this.croppedImagePath='';
    const options: CameraOptions = {
      quality: 20,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((image) => {
 
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagePath = 'data:image/jpeg;base64,' + image;
      this.imagepath = image;
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
    let body = {
      // mediafile: this.capturedSnapURL
      mediafile: this.croppedImagePath
    };
    this.user.present('uploading...');
    this.auth.uploadSingleMenuImage(body).subscribe(res => {
      this.user.dismiss();
      this.uploadSingleRes = res;
      this.uploadSingleResData = this.uploadSingleRes.data;
      this.multipleImageArray.push(this.uploadSingleResData.filename);
      this.imageData=this.uploadSingleResData.filename;
      this.img=this.imageData;
  
      // alert(JSON.stringify(this.uploadSingleResData));
      // alert(JSON.stringify(this.multipleImageArray));
    
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
      // alert((menuList.category));
      if(menuList.category==undefined){
      alert('Please Select Food Categoty..')
      }else{
        console.log(menuList);
        this.user.present('uploading...');
        this.auth.uploadMenulist(menuList).subscribe(res => {
          this.user.dismiss();
          // console.log(JSON.stringify(res));
          this.router.navigateByUrl('nav/chef-home');
          this.user.showToast('Menu added successfully...');
          // contactMenuForm.reset();
        }, err => {
          this.user.dismiss();
          alert(JSON.stringify(err))
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
      this.chef_about_me= this.userAllData.aboutme;
      this.chef_address= this.userAllData.address;
      this.chef_city_name= this.userAllData.city.city_name;
      this.chef_city_id= this.userAllData.city.id;
      this.chef_state_name= this.userAllData.state.state_name;
      this.chef_state_id= this.userAllData.state.id;
     
      this.chef_email= this.userAllData.email; 
      this.chef_firstname= this.userAllData.firstname;
      this.chef_lastname= this.userAllData.lastname;
      this.chef_id= this.userAllData.id;
      this.chef_phone= this.userAllData.phone;
      this.chef_pin= this.userAllData.pin;
      this.chef_role= this.userAllData.role;
      this.chef_skills= this.userAllData.skills;
      this.chef_specialization= this.userAllData.specialization;
      this.chef_description= this.userAllData.description;

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
