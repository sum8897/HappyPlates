import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  type: string;
  customer = true;
  chef = false;
  matched = false;
  matchedpass = false;
  getpas: any;
  croppedImagePath: any;
  constructor(private auth: AuthService,
    public user: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public camera: Camera,) { }

  ngOnInit() {
    this.type = 'customer';
  }
  segmentChanged(ev: any) {
    this.type = ev.detail.value;
    if (this.type == 'customer') {
      this.customer = true;
      this.chef = false;
      let body = {
        fname: "ashish",
        lname: "chaurasiya",
      }
    } else {
      this.customer = false;
      this.chef = true;
    }
    console.log('Segment changed', this.type);
  }
  checkParent:boolean;
  checkCheckbox(e:any){
    console.log(e);
    console.log(this.checkParent)
  }
  registrationForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', [Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
    ]],
    country: ['', [Validators.required, Validators.maxLength(30)]],
    state: ['', [Validators.required, Validators.maxLength(30)]],
    city: ['', [Validators.required, Validators.maxLength(30)]],
    specialization: ['', [Validators.required, Validators.maxLength(100)]],
    aboutme: ['', [Validators.required, Validators.maxLength(100)]],
    skills: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    pin: ['', [Validators.required, Validators.pattern("(0/91)?[0-9]{10}"),]],
    address: ['', [Validators.required, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.pattern("(0/91)?[0-9]{10}"),]],
    password: ['', [Validators.required, Validators.minLength(8),
    this.getpass.bind(this)]],
    cpassword: ['', [Validators.required, Validators.minLength(8),
    this.matchpass.bind(this)]],
  });
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
  get specialization() {
    return this.registrationForm.get('specialization');
  }
  get aboutme() {
    return this.registrationForm.get('aboutme');
  }
  get description() {
    return this.registrationForm.get('description');
  }
  get skills() {
    return this.registrationForm.get('skills');
  }
  get country() {
    return this.registrationForm.get('country')
  }
  get state() {
    return this.registrationForm.get('state')
  }
  get city() {
    return this.registrationForm.get('city')
  }
  get pin() {
    return this.registrationForm.get('pin')
  }
  get address() {
    return this.registrationForm.get('address')
  }
  // get profile() {
  //   return this.registrationForm.get('profile')
  // }
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
      { type: 'pattern', message: 'Please enter 10 digit phone number only' }
    ],
    email: [
      { type: 'required', message: 'You must enter Email' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    specialization: [
      { type: 'required', message: 'You must enter specialization' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    skills: [
      { type: 'required', message: 'You must enter Skills' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    description: [
      { type: 'required', message: 'You must enter Description' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    aboutme: [
      { type: 'required', message: 'You must enter specialization' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    country: [
      { type: 'required', message: 'You must enter Country' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }
    ],
    city: [
      { type: 'required', message: 'You must enter city name' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }
    ],
    state: [
      { type: 'required', message: 'You must enter State name' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }
    ],
    pin: [
      { type: 'required', message: 'You must enter Pin name' },
      { type: 'maxlength', message: 'Name cant be longer than 6 characters' }
    ],
    address: [
      { type: 'required', message: 'You must enter Address' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }
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


  getpass(formGroup: FormGroup) {
    this.getpas = formGroup.value
  }
  matchpass(formGroup: FormGroup) {
    if ((formGroup.value === this.getpas)) {
      this.matched = false;
      this.matchedpass = true;
      if (formGroup.value == '') {
        this.matchedpass = false;
      }
    }
    else {
      this.matched = true;
      this.matchedpass = false;
    }
    console.log(formGroup.value)
  }

  imagepath: any = "";
  pickImage(sourceType) {
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
      this.imagepath = imageData;
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
    this.auth.uploadSingleMenuImage(body).subscribe(res => {
      this.uploadSingleRes = res;
      this.uploadSingleResData = this.uploadSingleRes.data;
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
    }, err => {
      alert(JSON.stringify(err))
      console.log(err.error)
    })
  }
  checkedValue(e:any){
    console.log(e.detail.checked)
  }
  user_reg:any;
  submitForm() {
    console.log(this.registrationForm.value);
    if(this.type=='customer'){
      this.user_reg = {
        "firstname": this.registrationForm.value.firstname,
        "lastname": this.registrationForm.value.lastname,
        "phone": this.registrationForm.value.phone,
        "email": this.registrationForm.value.email,
        "country": this.registrationForm.value.country,
        "state": this.registrationForm.value.state,
        "city": this.registrationForm.value.city,
        "pin": this.registrationForm.value.pin,
        "address": this.registrationForm.value.address,
        "prof_image": this.croppedImagePath,
        "password": this.registrationForm.value.password,
        "role": this.type,
        "agreeterms": "Yes"
      }
      
    }
    else{
      this.user_reg = {
        "firstname": this.registrationForm.value.firstname,
        "lastname": this.registrationForm.value.lastname,
        "phone": this.registrationForm.value.phone,
        "email": this.registrationForm.value.email,
        'specialization':this.registrationForm.value.specialization,
        'skills':this.registrationForm.value.skills,
        'description':this.registrationForm.value.description,
        'aboutme':this.registrationForm.value.aboutme,
        "country": this.registrationForm.value.country,
        "state": this.registrationForm.value.state,
        "city": this.registrationForm.value.city,
        "pin": this.registrationForm.value.pin,
        "address": this.registrationForm.value.address,
        "prof_image": this.croppedImagePath,
        "password": this.registrationForm.value.password,
        "role": this.type,
        "agreeterms": "Yes"
      }
    }
  console.log(this.user_reg);
    this.user.present('wait..');
    this.auth.userRegister(this.user_reg).subscribe((response) => {
      this.user.dismiss();
      this.router.navigateByUrl('nav/login');
      console.log(response);
    },err=>{
      this.user.dismiss();
      console.log('user Register Error'+ JSON.stringify(err));
    })
  }
  clickLogin() {
    this.router.navigateByUrl('nav/login')
  }
}
