import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registercustomer',
  templateUrl: './registercustomer.component.html',
  styleUrls: ['./registercustomer.component.scss'],
})
export class RegistercustomerComponent implements OnInit {
  // stateCard = false;
  // state_res: any;
  // state_data: any;
  // selectState_id;
  // statename: any
  // cityCard: boolean = false;
  // city_data: any;
  // city_res: any;
  // cityname: any;
  // cityId: any;

  user_res:any;
  constructor(public auth: AuthService,
    public user: UserService,
    public common: CommonService,
    public fb: FormBuilder,
    public router: Router,
    public alertController:AlertController) {
  }



  ngOnInit() { }

  registrationForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', [Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    phone: ['', [Validators.required, Validators.pattern("(0/91)?[0-9]{10}"),]],
    pin: ['', [Validators.required,
               Validators.pattern("(0/91)?[0-9]{6}"),
    ]],
    address: ['', [Validators.required, Validators.maxLength(300),]],
    password: ['',[Validators.required, 
               Validators.minLength(8),
      ]],
      cpassword: ['', [Validators.required, 
                 Validators.minLength(8),
      //  this.matchpass.bind(this)
      ]],
  });
  checkValue: any = true;
  checkedValue(e: any) {
    this.checkValue = '';
    console.log(e.detail.checked);
    this.checkValue = e.detail.checked;
  }
  get firstname() {
    return this.registrationForm.get("firstname");
  }
  get lastname() {
    return this.registrationForm.get('lastname')
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get pin() {
    return this.registrationForm.get('pin')
  }
  get address() {
    return this.registrationForm.get('address')
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get cpassword() {
    return this.registrationForm.get('cpassword');
  }
  public errorMessages = {
    firstname: [
      { type: 'required', message: 'You must enter first name' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }
    ],
    lastname: [
      { type: 'required', message: 'You must enter last name' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }
    ],
    phone: [
      { type: 'required', message: 'You must enter phone number' },
      { type: 'pattern', message: 'Please enter 10 digit phone number only' },
      { type: 'maxlength', message: 'phone cant be longer than 10 digit' }
    ],
    email: [
      { type: 'required', message: 'You must enter Email' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    pin: [
      { type: 'required', message: 'You must enter zip code' },
      { type: 'pattern', message: 'Zip code required 6 characters only.' },
    ],
    address: [
      { type: 'required', message: 'You must enter Address' },
      { type: 'maxlength', message: 'Address cant be longer than 300 characters' }
    ],
    password: [
      { type: 'required', message: 'You must enter password' },
      { type: 'minlength', message: 'password must be at least 8 characters long.' },
    ],
    cpassword: [
      { type: 'required', message: 'You must enter confirm password' },
      { type: 'minlength', message: 'confirm password must be at least 8 characters' }
    ],
  };
  country_id: any=1;
  onSubmit() {

    if (this.checkValue == false) {
      alert('You have to checked accept terms & policy.');
    } else if (this.common.selectState_id == undefined) {
      alert('Please select your state');
    }
    else if (this.common.cityId == undefined) {
      alert('Please select your city');
    }
    else {
      console.log(this.common.imageData);
      if(this.common.imageData==''){
        this.showExitConfirm(this.registrationForm.value);
      }
      else{
        this.submitdata(this.registrationForm.value);
      }

    }
  }
  showExitConfirm(registerdata:any) {
    this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to continue without uploading profile image ?',
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Ok',
        handler: () => {
          this.submitdata(registerdata);
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
  submitdata(registerdata:any){
    console.log(registerdata);
    let user_reg = {
      "firstname": registerdata.firstname,
      "lastname": registerdata.lastname,
      "phone": registerdata.phone,
      "email": registerdata.email,
      "country": this.country_id,
      "state": this.common.selectState_id,
      "city": this.common.cityId,
      "pin": registerdata.pin,
      "address": registerdata.address,
      "password": registerdata.password,
      "cpassword": registerdata.cpassword,
      "role": 'customer',
      "agreeterms": "yes",
      "prof_image": this.common.imageData,
    }

    console.log(user_reg);
    this.user.present('wait..');
    this.auth.userRegister(user_reg).subscribe((response) => {
      this.user_res=response;
      this.user.dismiss();
      console.log(response);
      if(this.user_res.error==='Email  already exists'){
        alert('Email already exists,Please try with another Email.');
      }
      else if(this.user_res.error==='Phone  already exists'){
        alert('Phone number alreday exists , Please try with another Phone number.')
      }else{
       this.router.navigate(['/loginpage']);
       this.user.showToast('You are register successfully...');
      }
     
    }, err => {
     alert(JSON.stringify(err.errors));
      this.user.dismiss();  
    })
  }
  clickLogin() {
    this.router.navigateByUrl('/loginpage')
  }

  // stateshow() {
  //   this.stateCard = true;
  //   this.stateList();
  // }

  // stateList() {
  //   let body = {
  //     country_id: 1,
  //   }
  //   this.user.present('loading states...');
  //   this.auth.getState(body).subscribe(state_data => {
  //     this.state_res = state_data;
  //     this.state_data = this.state_res.state;
  //     console.log(this.state_data);
  //     this.user.dismiss();
  //   }, err => {
  //     this.user.dismiss();
  //   })
  // }

  // selectState(e: any) {
  //   console.log(e.currentTarget.value.state_name);
  //   this.statename = e.currentTarget.value.state_name;
  //   this.selectState_id = e.currentTarget.value.id;
  //   this.stateCard = false;
  // }

  // cityshow() {
  //   console.log('city show...');

  //   this.cityList(this.selectState_id);
  // }

  // cityList(state_id: any) {
  //   console.log(state_id);
  //   if (state_id == undefined) {
  //     alert('You have to select State first.');
  //   } else {
  //     let body = {
  //       state_id: state_id,
  //     }
  //     this.user.present('loading cities...');
  //     this.auth.getCities(body).subscribe(state_data => {
  //       this.city_res = state_data;
  //       this.city_data = this.city_res.city;
  //       this.cityCard = true;
  //       this.user.dismiss();
  //     }, err => {
  //       this.user.dismiss();
  //       alert('Something went wrong, Please try afetr sometimes.')
  //     })
  //   }

  // }

  // selectCity(e: any) {
  //   console.log(e.currentTarget.value.city_name);
  //   this.cityname = e.currentTarget.value.city_name;
  //   this.cityId = e.currentTarget.value.id;
  //   this.cityCard = false;
  // }

}
