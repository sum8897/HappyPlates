import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import SwiperCore, { SwiperOptions } from 'swiper';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  // config: SwiperOptions = {
  //   slidesPerView: 2.4,
  //   spaceBetween: 50,
  //   navigation: true,
  //   pagination: { clickable: true },
  //   scrollbar: { draggable: true },
  // };
  croppedImagePath = "";
  isLoading = false;

  menu_data;
  menu_data_list;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 100
  };

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2.3,
    // slidesPerColumn: 1,
    // slidesPerGroup: 1,
    // watchSlidesProgress: true,
    // resistanceRatio: 0,
    spaceBetween: 10,
  };
  slidesLatest = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    // slidesPerColumn: 1,
    // slidesPerGroup: 1,
    // watchSlidesProgress: true,
    // resistanceRatio: 0,
    spaceBetween: 10,
  };
  slidesEvent = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  }
  slidesBlog = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2.5,
  }
  user_type
  constructor(private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private signInWithApple: SignInWithApple,
    public auth: AuthService,
    public router: Router,
    public user: UserService) {
    // this.menuData();
    this.chefAllData()
    this.testimonialsAllData();
    // this.latestChefsAllData();
    this.latestEvents();
    this.blogMainData();
    this.user_type=localStorage.getItem('user_role');
    this.user.sideMenu=[];
    this.user.NAV.filter((data)=>{
     
      if(data.role===this.user_type){
           this.user.sideMenu.push(data)  ;
          }
          return this.user.sideMenu;
    })
  }

  ngOnInit() { }
  onSwiper([swiper]) {
    console.log(swiper);
  }


  menuData() {
    this.user.present('...');
    this.auth.getMenuData().subscribe((data) => {
      this.user.dismiss();
      console.log(data);
     
      this.menu_data = data;
      this.menu_data_list = this.menu_data.data;
      // console.log(this.menu_data_list)
    }, err => {
      this.user.dismiss();
      console.log(err)
    }
    )
  }
  professionData;
professionAllData;
searchTermProfession:any='';
filterTermProfession=[];
filterTermss=[];
  chefsResp: any;
  chefsRespoData: any;
  chefAllData() {
    this.user.present('...')
    this.auth.getAllChefData().subscribe((res) => {
      this.user.dismiss();
      console.log(res)
     
      this.chefsResp = res;
      this.chefsRespoData = this.chefsResp.data;
      console.log(this.chefsRespoData);
      for (let i = 0; i < this.chefsRespoData.length; i++) {
        this.filterTermProfession[i] = [{
          "id": this.chefsRespoData[i].id,
          "firstname": this.chefsRespoData[i].firstname,
          "lastname": this.chefsRespoData[i].lastname,
          "specialization": this.chefsRespoData[i].specialization,
          "city": this.chefsRespoData[i].city
        }]
      }
      console.log(this.filterTermProfession)
    }, err => {
      this.user.dismiss();
      console.log(err.name);
    

    }
    )
  }
  filterItemProfession() {
    this.filterTermProfession = [];
    this.filterTermss = this.chefsRespoData.filter(item => item.firstname.toLowerCase().indexOf(this.searchTermProfession.toLowerCase()) > -1);
    console.log(this.filterTermss)
    for (let i = 0; i < this.filterTermss.length; i++) {
      this.filterTermProfession[i] = [{
        "id": this.filterTermss[i].id,
        "firstname": this.filterTermss[i].firstname,
        "lastname": this.filterTermss[i].lastname,
        "specialization": this.filterTermss[i].specialization,
        "city": this.filterTermss[i].city

      }]
    }
    console.log(typeof(this.filterTermProfession));
    // if(this.filterTermProfession.length==0){
    //   this.filterTermProfession=[];
    //   console.log('data not found')
    // }else{
    //   console.log(this.filterTermProfession)
    // }
  }
  async openSingleDetails(chef:any){
    console.log(chef)
    this.user.chef_id=chef;
    this.router.navigateByUrl('/nav/chef-menu-review')
  }

  testimonialeRes: any;
  testimonialsData: any;

  testimonialsAllData() {
    this.auth.getAllTestimonials().subscribe(res => {
      this.testimonialeRes = res;
      this.testimonialsData = this.testimonialeRes.data;
      console.log(this.testimonialsData);
    }, err => {
      console.log(err)
    })
  }

latestchefRes;
latestchefsData;
//   latestChefsAllData(){
//     this.auth.getAllLatestChefs().subscribe((data)=>{
//       this.latestchefRes=data;
//       this.latestchefsData=this.latestchefRes.data;
//       console.log(this.latestchefRes)
//     },err=>{
// console.log(err)
//     })
//   }

  latestEventRes;
  latestEventData;
  latestEventAllData:any=[];
  latestEvents(){
    
    this.auth.getAllEvents().subscribe(data=>{
      this.latestEventRes=data;
      this.latestEventData=this.latestEventRes.data;
      console.log(this.latestEventData);
      for(let i=0;i<this.latestEventData.length;i++){
            this.latestEventAllData[i]=
              {
                id: this.latestEventData[i].id,
                date: this.latestEventData[i].date,
                event_image: this.latestEventData[i].event_image,
                intro: this.latestEventData[i].intro,
                mediaId: this.latestEventData[i].mediaId,
                status:this.latestEventData[i].status,
                location: this.latestEventData[i].location,
                title: this.latestEventData[i].title
              }
            
      }
      console.log(this.latestEventAllData)
    },err=>{
      console.log(err)
    })
  }
  seeChefMenu() {
    this.router.navigateByUrl('nav/chef-menu-review')
  }
  clickViewChef(){
    this.router.navigateByUrl('nav/viewallchef')
  }

  blogRes;
  blogDataAll;
  blogMainData(){
    this.auth.getAllBlogs().subscribe((data)=>{
      console.log(data);
      this.blogRes=data;
      this.blogDataAll=this.blogRes.data;
    },err=>{
      console.log('blog error..')
    })
  }
  viewAllBlogs(){
    this.router.navigateByUrl('nav/blog-all')
  }
  onSlideChange() {
    console.log('slide change');
  }
  chefData = [
    {
      id: 1,
      name: 'Gordon Ramsy',
      spel: 'Italian,Chinese',
      img: '../../../assets/img/chef_1.jpg'
    },
    {
      id: 2,
      name: 'Nikolas Apperts',
      spel: 'Bengali,South Indain',
      img: '../../../assets/img/chef_2.jpg'
    },
    {
      id: 3,
      name: 'James Apperts',
      spel: 'Bengali,South Indain',
      img: '../../../assets/img/chef_2.jpg'
    },
  ]
  eventData = [
    {
      id: 1,
      name: 'Prime Catering Live Cooking Event in Madison',
      details: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      img: '../../../assets/img/blog_1.jpg'
    },
    {
      id: 2,
      name: 'Prime Catering Live Cooking Event in New Delhi',
      details: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      img: '../../../assets/img/blog_1.jpg'
    },
    {
      id: 3,
      name: 'Prime Catering Live Cooking Event in United America',
      details: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      img: '../../../assets/img/blog_1.jpg'
    },
  ]
  blogData = [
    {
      id: 1,
      text: 'How to Cook Small Red Patatos',
      date: 'Oct 19 2021',
      img: '../../../assets/img/blog_1.jpg'
    },
    {
      id: 2,
      text: 'How to Cook Small Red Patatos',
      date: 'Oct 19 2021',
      img: '../../../assets/img/blog_2.jpg'
    },
    {
      id: 3,
      text: 'How to Cook Small Red Patatos',
      date: 'Oct 19 2021',
      img: '../../../assets/img/blog_3.jpg'
    },
    {
      id: 4,
      text: 'How to Make French Fry Rice',
      date: 'Oct 19 2021',
      img: '../../../assets/img/blog_1.jpg'
    },
    {
      id: 5,
      text: 'How to Cook Small Red Chili',
      date: 'Jan 19 2022',
      img: '../../../assets/img/blog_3.jpg'
    },
  ]

  //   loginClick(){
  //     let userBody={
  //       "email": "vinaym@midaswebtech.com",
  //       "password": "12345678"
  //     }
  //     this.auth.loginUser(userBody).subscribe(data=>{

  // console.log(data)
  //     },err=>{

  //     })
  //   }

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
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
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

  AppleSignIn() {

    this.signInWithApple
      .signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
        ]
      })
      .then((res: AppleSignInResponse) => {
        console.log("Apple login success:- " + res);
      })
      .catch((error: AppleSignInErrorResponse) => {
        console.log("Apple Login Error:" + error);
      });
  }
}

