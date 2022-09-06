import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  type: string;
  customer=true;
  chef=false;
  constructor(private auth: AuthService,
    public user: UserService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private  httpClient:  HttpClient,
    public alertCtrl: AlertController,
    public navCtrl: NavController,) { }

  ngOnInit() {
    this.type = 'customer';
  }
  segmentChanged(ev: any) {
    this.type = ev.detail.value;
    if(this.type=='customer'){
      this.customer=true;
      this.chef=false;
      let body={
        fname:"ashish",
        lname:"chaurasiya",
      }
    }else{
      this.customer=false;
      this.chef=true;
    }
    console.log('Segment changed', this.type);
  }

  registrationForm = this.formBuilder.group({
    firstname: ['', [Validators.required,Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['',[Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]],
    phone: ['',[Validators.required,Validators.pattern("(0/91)?[0-9]{10}"),]],
    password: ['',[Validators.required,Validators.minLength(8),
              this.getpass.bind(this)]],
    cpassword: ['',[Validators.required,Validators.minLength(8),
              this.matchpass.bind(this)]],   
  });
  get firstname() {
    return this.registrationForm.get("firstname");
  }
  get lastname(){
    return this.registrationForm.get('lastname')
  }
  get phone(){
    return this.registrationForm.get('phone');
  }
get email(){
  return this.registrationForm.get('email');
}
get password(){
  return this.registrationForm.get('password');
}
get cpassword(){
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
      { type: 'pattern', message: 'Please enter 10 digit phone number only' }
    ],
    email: [
      { type: 'required', message: 'You must enter Email' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'You must enter password' },
      { type: 'minlength', message: 'password must be at least 8 characters long.' },
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    ],
    cpassword: [
      { type: 'required', message: 'You must enter confirm password' },
      { type: 'minlength', message: 'confirm password must be at least 8 characters' }
    ],
    
  };

  matched = false;
  matchedpass=false;
  getpas;
  getpass(formGroup:FormGroup){
    this.getpas = formGroup.value
  }
    matchpass(formGroup:FormGroup){
    if((formGroup.value === this.getpas)){
      this.matched= false;
      this.matchedpass=true;
      if(formGroup.value ==''){
        this.matchedpass=false;
    }}
     else {
      this.matched= true;
      this.matchedpass=false;
    }
    console.log(formGroup.value)
  }

  submitForm(){
    console.log(this.registrationForm.value);
    let user_reg={
      "firstname": this.registrationForm.value.firstname,
      "lastname" : this.registrationForm.value.lasttname,
      "phone"    : this.registrationForm.value.phone,
      "email"    : this.registrationForm.value.email,
      "password" : this.registrationForm.value.password,
      "role"     : 'customer'
    }
    this.user.present('wait..');
    this.auth.userRegister(user_reg).subscribe((response)=>{
      this.user.dismiss();
      this.router.navigateByUrl('nav/login');
      console.log(response);
    }),err=>{
      this.user.dismiss();
      console.log('register error')
    }
  }
  clickLogin(){
    this.router.navigateByUrl('nav/login')
  }
}
