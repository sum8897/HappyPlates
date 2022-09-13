import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
address:any="A-211 , DLF Mall, Noida Sector 16, Uttar Pradesh";
user_name:any="Ashish Chaurasiya";
  constructor(public auth: AuthService,
              public user: UserService) { 
                this.userDetails();
              }

  ngOnInit() {}

  userRes: any;
  userData: any;
  userAllData: any;
  user_location;
  user_phone;
  userDetails() {
    this.user.present('');
    this.auth.getUserProfile().subscribe((data) => {
      this.user.dismiss();
      this.userRes = data;
      this.userData = this.userRes.data;
      this.userAllData = this.userData[0];
      this.user_name = this.userAllData.firstname + " " + this.userAllData.lastname;
      this.user_phone=this.userAllData.phone;
      this.user_location = this.userAllData.address;
      this.user.chef_id = this.userAllData.id;
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
      console.log(this.userData);
      // contactAddressForm.reset();
    }, err => {
      this.user.dismiss();
      console.log(err);
    })
  }

}
