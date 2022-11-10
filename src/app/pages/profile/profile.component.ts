import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UploadBlogComponent } from '../upload-blog/upload-blog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
address:any="A-211 , DLF Mall, Noida Sector 16, Uttar Pradesh";
user_name:any="Ashish Chaurasiya";

ratingValue5:any=5;
ratingValue4:any=4;
ratingValue3:any=3;
ratingValue2:any=2;
ratingValue1:any=1;
ratingValue:any;
customerback:boolean=false;
chefback:boolean=false;
public form: FormGroup;
  constructor(public auth: AuthService,
              public user: UserService,
              private fb: FormBuilder,
              public modalCtrl: ModalController,
              public router: Router) { 
                this.userDetails();
      if(localStorage.getItem('user_role')=="customer"){
      this.customerback=true;
      this.chefback=false;
      console.log(this.customerback+ ""+this.chefback)
      }else if(localStorage.getItem('user_role')=="chef"){
        this.customerback=false;
        this.chefback=true;
        console.log(this.customerback+ ""+this.chefback)
      }
              }

  ngOnInit() {}

  userRes: any;
  userData: any;
  userAllData: any;
  user_location;
  user_phone;
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
      this.user_name = this.userAllData.firstname + " " + this.userAllData.lastname;
      this.user_phone=this.userAllData.phone;
      this.cityname=this.userAllData.city.city_name;
      this.cityId=this.userAllData.city.id;
      this.statename=this.userAllData.state.state_name;
      this.selectState_id=this.userAllData.state.id;
      this.user_location = this.userAllData.address+ this.userAllData.city+" "+this.userAllData.state+" "+ this.userAllData.pin;
      this.user.chef_id = this.userAllData.id;
      console.log(this.user_image)
      if(this.user_image===""){
        console.log('image not foubd');
        this.user_ProfImage='../../assets/img/user_icon.png';

      }else{
        console.log('image found...');
        this.user_ProfImage= this.user_image;
      }
      console.log(this.userAllData);

    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }

  onSubmit(contactForm:any) {
    console.log(contactForm.value);
    console.log("form" + JSON.stringify(contactForm.value));
    contactForm.reset();
  }
  updateRes: any;
  updateData: any;
  updateAllData: any;
  country_id = 1;
  body:any;
  onAddressSubmit(contactAddressForm: any) {
    console.log(this.user_phone);
    this.body='';
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));
   if(contactAddressForm.value.firstname==undefined){
    contactAddressForm.value.firstname=this.user.user_first_name;
   }
   if(contactAddressForm.value.lastname==undefined){
    contactAddressForm.value.lastname=this.user.user_last_name;
   }if(contactAddressForm.value.phone==undefined){
    contactAddressForm.value.phone=this.user_phone;
    
   }else{
    contactAddressForm.value.phone=contactAddressForm.value.phone;
   }
   if(this.selectState_id==undefined){
    this.selectState_id=this.selectState_id;
   }
   if(this.cityId==undefined){
    this.cityId=this.cityId;
   }
   if(contactAddressForm.value.pin==undefined){
    contactAddressForm.value.pin=this.user.user_pin;
   }
if(contactAddressForm.value.location==undefined){
  contactAddressForm.value.location=this.user.user_location;
}

  this.body = {
    'firstname': contactAddressForm.value.firstname,
    'lastname': contactAddressForm.value.lastname,
    'email': localStorage.getItem('user_email'),
    'password': localStorage.getItem('password'),
    'phone': this.user_phone,
    'country': this.country_id,
    'state': this.selectState_id,
    'city': this.cityId,
    'pin': this.user.user_pin,
    'address': contactAddressForm.value.location,
    'role': localStorage.getItem('user_role')
  }
  console.log(this.body);
  console.log((this.body.phone).toString().length);
  console.log((this.body.pin).toString().length);
  if((this.body.phone).toString().length<10 || (this.body.phone).toString().length>10){
    alert('Please enter valid phone number.');
  }
  else if((this.body.pin).toString().length<6 || (this.body.pin).toString().length>6){
alert('Zip code should be 6 digit only.')
  }
  else{
  this.user.present('');
  this.auth.updateProfileData(this.body).subscribe((data) => {
    this.user.dismiss();
    this.userRes = data;
    this.userData = this.userRes.data;
    this.user_location = this.userData.address;
    this.user_name = this.userData.firstname + " " + this.userData.lastname;
    // console.log(this.userData);
    this.router.navigateByUrl('nav/mainpage');
    this.user.showToast('Profile Update successfully..');
     this.user.userDetails();
  }, err => {
    this.user.dismiss();
    console.log(err);
  })
  }




   
    
  }
async addBlogs(){
  const modal = await this.modalCtrl.create({  
    component: UploadBlogComponent,
    componentProps: { user_id: this.user.chef_id}
  });  
  return await modal.present();  
}
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
