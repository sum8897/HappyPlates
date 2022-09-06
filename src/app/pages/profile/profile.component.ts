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
                this.userProfileData();
              }

  ngOnInit() {}

  userProfileData(){
    this.auth.getUserProfile().subscribe((data)=>{
   console.log(data)
    },err=>{
      console.log(err)
    }) 
   }
  onSubmit(contactForm:any) {
    console.log(contactForm.value);
    console.log("form" + JSON.stringify(contactForm.value));
    contactForm.reset();
  }
  onAddressSubmit(contactAddressForm:any){
    console.log(contactAddressForm.value);
this.user_name=contactAddressForm.value.fullname;
    this.address=contactAddressForm.value.location+ " " +
                 contactAddressForm.value.city+ " " +contactAddressForm.value.state + " " +contactAddressForm.value.pin;
                 console.log(this.address)
    console.log("form" + JSON.stringify(contactAddressForm.value));
    contactAddressForm.reset();
  }
}
