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
import { CommonService } from 'src/app/services/common.service';

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
    private alertController: AlertController,
    public camera: Camera,
    public common: CommonService) { }

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
  minheightcard = false;
  minHeightShow() {
    this.minheightcard = true;
    this.selectCountry();
  }
  selectedMinHeight: any;
  country_id: any=1;
  selectMinHeight(e: any) {
    console.log(e.currentTarget.value.country_name);
    this.price = e.currentTarget.value.country_name;
    this.country_id = e.currentTarget.value.id;
    this.minheightcard = false;
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
  cityname:any;
  cityId:any;
  cityshow() {
    console.log('city show...');
    this.cityCard = true;
    this.cityList(this.selectState_id);
  }
  cityList(state_id: any) {
    console.log(state_id)
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
  selectCity(e: any) {
    console.log(e.currentTarget.value.city_name);
    this.cityname = e.currentTarget.value.city_name;
    this.cityId = e.currentTarget.value.id;
    this.cityCard = false;
  }
  selectState_id;
  stateList() {
    let body = {
      country_id: 1,
    }
    this.user.present('');
    this.auth.getState(body).subscribe(state_data => {
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
  async selectCountry() {
    this.auth.getCountry().subscribe(country => {
      this.country_res = country;
      this.country_data = this.country_res.country;
      console.log(this.country_data);
    }, err => {

    })
  }
  price: any;
  country_res: any;
  country_data: any;
  async selectCountry1() {
    this.auth.getCountry().subscribe(country => {
      this.country_res = country;
      this.country_data = this.country_res.country;
      console.log(this.country_data);
    }, err => {

    })
    const alert = await this.alertController.create({
      header: 'Select Price',

      inputs: [
        {
          label: '250',
          type: 'radio',
          value: '250',
        },
        {
          label: '500',
          type: 'radio',
          value: '500',
        },
        {
          label: '600',
          type: 'radio',
          value: '600',
        },
        {
          label: '800',
          type: 'radio',
          value: '800',
        },
        {
          label: '1000',
          type: 'radio',
          value: '1000',
        },
      ],
      buttons: [
        {
          text: 'ok',
          role: 'confirm',
          handler: (user_type) => {
            this.price = user_type;

            if (user_type == undefined) {
              console.log('please enter user type...');
            } else {
              console.log(user_type);
            }
          },
        }
      ],
    });

    await alert.present();
  }
  passwordvalue:any
  onInputPass(e){
    console.log(e.target.value);
    this.passwordvalue=e.target.value;
  }
  checkParent: boolean;
  checkCheckbox(e: any) {
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
    specialization: ['', [Validators.required, Validators.maxLength(300)]],
    aboutme: ['', [Validators.required, Validators.maxLength(300)]],
    skills: ['', [Validators.required, Validators.maxLength(300)]],
    description: ['', [Validators.required, Validators.maxLength(300)]],
    pin: ['', [Validators.required, Validators.pattern("(0/91)?[0-9]{10}"),]],
    address: ['', [Validators.required, Validators.maxLength(300)]],
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
  // get country() {
  //   return this.registrationForm.get('country')
  // }
  // get state() {
  //   return this.registrationForm.get('state')
  // }
  // get city() {
  //   return this.registrationForm.get('city')
  // }
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
      { type: 'maxlength', message: 'Name cant be longer than 300 characters' }
    ],
    skills: [
      { type: 'required', message: 'You must enter Skills' },
      { type: 'maxlength', message: 'Name cant be longer than 300 characters' }
    ],
    description: [
      { type: 'required', message: 'You must enter Description' },
      { type: 'maxlength', message: 'Name cant be longer than 300 characters' }
    ],
    aboutme: [
      { type: 'required', message: 'You must enter specialization' },
      { type: 'maxlength', message: 'Name cant be longer than 300 characters' }
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
      { type: 'required', message: 'You must enter pin code' },
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
    console.log(formGroup.value);
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
  checkValue:any=true;
  checkedValue(e: any) {
    this.checkValue='';
    console.log(e.detail.checked);
    this.checkValue=e.detail.checked;
  }
  user_reg: any;
  submitForm() {
    this.user_reg='';
    console.log((this.registrationForm.value.phone).toString().length);
    console.log(this.registrationForm.value.password);
    console.log(this.passwordvalue.length);
    if (this.type == 'customer'){
      if(this.checkValue==false){
        alert('Please mark the checkBox..');
          }
            else{
               if((this.registrationForm.value.phone).toString().length<10){
                  alert('Please enter Valid Mobile Number');
                  console.log(this.registrationForm.value.phone.length)
                }
                else if((this.registrationForm.value.phone).toString().length>10){
                  alert('Please enter Valid Mobile Number');
                }
                else if(this.registrationForm.value.firstname=="" || this.registrationForm.value.lastname=="" ||this.registrationForm.value.phone=="" || this.selectState_id==undefined || this.cityId==undefined || this.registrationForm.value.address==""){
           alert('Please Enter all Details...');
                }
            else if(this.registrationForm.value.pin=="" || this.registrationForm.value.pin.length<6){
                  alert('please enetr valid 6 digit zip code');
     
                }
                else if(this.registrationForm.value.password="" || this.registrationForm.value.password.length<8) {
           alert('please enetr minimum 8 digit password');
                }
                else if((this.registrationForm.value.pin).toString().length<6){
               alert('Zip code can not be less than 999999')
                }
                else if((this.registrationForm.value.pin).toString().length>6){
                  alert('Zip code can not be greater than 999999')
                   }
                   else if(this.passwordvalue==""){
                     alert('Password must be at least 8 characters')
                   }
                else{
                  console.log(this.registrationForm.value.password);
                  this.user_reg = {
                    "firstname": this.registrationForm.value.firstname,
                    "lastname": this.registrationForm.value.lastname,
                    "phone": this.registrationForm.value.phone,
                    "email": this.registrationForm.value.email,
                    "country": this.country_id,
                    "state": this.selectState_id,
                    "city": this.cityId,
                    "pin": this.registrationForm.value.pin,
                    "address": this.registrationForm.value.address,
                    "password": this.passwordvalue,
                    "role": this.type,
                    "agreeterms": "yes",
                    "prof_image": this.croppedImagePath,
                  }
             console.log(this.user_reg);
             this.user.present('wait..');
             this.auth.userRegister(this.user_reg).subscribe((response) => {
               this.user.dismiss();
               this.router.navigateByUrl('nav/login');
               this.user.showToast('You are register successfully...');
               console.log(response);
             }, err => {
               this.user.dismiss();
               alert(JSON.stringify(err.error));
             })


                }

          }
    }
    else{
      if(this.checkValue==false){
        alert('Please mark the checkBox..');
          }
          else{

            if(this.registrationForm.value.firstname=="" || this.registrationForm.value.lastname=="" || this.registrationForm.value.phone=="" || this.registrationForm.value.email=="" || this.registrationForm.value.specialization=="" || this.registrationForm.value.skills=="" || this.registrationForm.value.description=="" || this.registrationForm.value.aboutme=="" || this.selectState_id==undefined || this.cityId==undefined || this.registrationForm.value.pin=="" || this.registrationForm.value.address=="" || this.registrationForm.value.password==""){
              alert('Please Enter all required fields...');
            }
            
            else if((this.registrationForm.value.phone).toString().length>10){
              alert('Please enter Valid Mobile Number');
            }
            else if(this.registrationForm.value.firstname=="" || this.registrationForm.value.lastname=="" ||this.registrationForm.value.phone=="" || this.selectState_id==undefined || this.cityId==undefined || this.registrationForm.value.address==""){
       alert('Please Enter all Details...');
            }
        else if(this.registrationForm.value.pin=="" || this.registrationForm.value.pin.length<6){
              alert('please enetr valid 6 digit zip code');
 
            }
            else if(this.registrationForm.value.password="" || this.registrationForm.value.password.length<8) {
       alert('please enetr minimum 8 digit password');
            }
            else if((this.registrationForm.value.pin).toString().length<6){
           alert('Zip code can not be less than 999999')
            }
            else if((this.registrationForm.value.pin).toString().length>6){
              alert('Zip code can not be greater than 999999')
               }
               else if(this.passwordvalue==""){
                 alert('Password must be at least 8 characters')
               }

              else{
                this.user_reg = {
                  "firstname": this.registrationForm.value.firstname,
                  "lastname": this.registrationForm.value.lastname,
                  "phone": this.registrationForm.value.phone,
                  "email": this.registrationForm.value.email,
                  'specialization': this.registrationForm.value.specialization,
                  'skills': this.registrationForm.value.skills,
                  'description': this.registrationForm.value.description,
                  'aboutme': this.registrationForm.value.aboutme,
                  "country": this.country_id,
                  "state": this.selectState_id,
                  "city": this.cityId,
                  "pin": this.registrationForm.value.pin,
                  "address": this.registrationForm.value.address,
                  "prof_image": this.croppedImagePath,
                  "password": this.passwordvalue,
                  "role": this.type,
                  "agreeterms": "Yes"
                }
        
                console.log(this.user_reg);
                this.user.present('wait..');
                this.auth.userRegister(this.user_reg).subscribe((response) => {
                  this.user.dismiss();
                  this.router.navigateByUrl('nav/login');
                  this.user.showToast('You are register successfully...');
                  console.log(response);
                }, err => {
                  this.user.dismiss();
                  alert(JSON.stringify(err.error));
                })
    
    
              }


            


          }
       

      }
 
      }
     
    
  
      onInput($event:any) {
        let theEvent = $event || window.event,
            key = theEvent.target.value,
            
            regex = /[0-9]+/g
        if( !regex.test(key) ) {
          let resp = $event.target.value.match(regex)
          $event.target.value = resp ? resp.join('')  : ''
        }
        console.log(key.length);
       }
  
  clickLogin() {
    this.router.navigateByUrl('nav/login')
  }
}
