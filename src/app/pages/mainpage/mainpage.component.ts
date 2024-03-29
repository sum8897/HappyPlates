import { TestimonialDetailsComponent } from './../testimonial-details/testimonial-details.component';
import { Component, OnInit } from '@angular/core';
// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
// import { File } from '@awesome-cordova-plugins/file/ngx';
import SwiperCore, { SwiperOptions } from 'swiper';
// import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { BlogdetailsComponent } from '../blogdetails/blogdetails.component';

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

  menu_data:any;
  menu_data_list:any;

  // imagePickerOptions = {
  //   maximumImagesCount: 1,
  //   quality: 50
  // };

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
    slidesPerView: 0.9,
    // slidesPerColumn: 1,
    // slidesPerGroup: 1,
    // watchSlidesProgress: true,
    // resistanceRatio: 0,
    // spaceBetween: 10,
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
  user_type:any;
  constructor(
    // private camera: Camera,
    public actionSheetController: ActionSheetController,
    // private file: File,
    public auth: AuthService,
    public router: Router,
    public user: UserService,
    public modalController: ModalController) {
    // this.menuData();
    this.chefAllData();
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
    this.menu_data_list='';
    // this.user.present('...');
    this.auth.getMenuData().subscribe((data) => {
      // this.user.dismiss();
      // console.log(data);
     
      this.menu_data = data;
      this.menu_data_list = this.menu_data.data;
      // console.log(this.menu_data_list)
    }, err => {
      this.user.dismiss();
      console.log(err)
    }
    )
  }
  professionData:any;
professionAllData:any;
searchTermProfession:any='';
filterTermProfession=[];
filterTermss=[];
  chefsResp: any;
  chefsRespoData: any;
  chefAllData() {
    this.chefsRespoData='';
    // this.user.present('...');
    this.auth.getAllChefData().subscribe((res) => {
      this.user.dismiss();
      // console.log(res)
      this.chefsResp = res;
      this.chefsRespoData = this.chefsResp.data;
      // console.log(this.chefsRespoData);
      for (let i = 0; i < this.chefsRespoData.length; i++) {
        if(this.chefsRespoData[i].prof_image==""){
          this.filterTermProfession[i] = [{
            "id": this.chefsRespoData[i].id,
            "firstname": this.chefsRespoData[i].firstname,
            "lastname": this.chefsRespoData[i].lastname,
            "specialization": this.chefsRespoData[i].specialization,
            "city": this.chefsRespoData[i].city,
            "prof_image": '../../../assets/img/user_icon.png',
          }]
        }else{
          this.filterTermProfession[i] = [{
            "id": this.chefsRespoData[i].id,
            "firstname": this.chefsRespoData[i].firstname,
            "lastname": this.chefsRespoData[i].lastname,
            "specialization": this.chefsRespoData[i].specialization,
            "city": this.chefsRespoData[i].city,
            "prof_image": this.chefsRespoData[i].prof_image,
          }]
        }
      
      }
      // console.log(this.filterTermProfession);
    }, err => {
      this.user.dismiss();
      console.log(err.name);
    

    }
    )
  }
  filterItemProfession() {
    this.filterTermProfession = [];
    this.filterTermss = this.chefsRespoData.filter(item => item.firstname.toLowerCase().indexOf(this.searchTermProfession.toLowerCase()) > -1);
    console.log(this.filterTermss);
    for (let i = 0; i < this.filterTermss.length; i++) {
      if(this.filterTermss[i].prof_image==""){
        this.filterTermProfession[i] = [{
          "id": this.filterTermss[i].id,
          "firstname": this.filterTermss[i].firstname,
          "lastname": this.filterTermss[i].lastname,
          "specialization": this.filterTermss[i].specialization,
          "city": this.filterTermss[i].city,
          "prof_image": '../../../assets/img/user_icon.png',
        }]
      }else{
        this.filterTermProfession[i] = [{
          "id": this.filterTermss[i].id,
          "firstname": this.filterTermss[i].firstname,
          "lastname": this.filterTermss[i].lastname,
          "specialization": this.filterTermss[i].specialization,
          "city": this.filterTermss[i].city,
          "prof_image": this.filterTermss[i].prof_image,
        }]
      }
   
    }
    // console.log(typeof(this.filterTermProfession));
    // if(this.filterTermProfession.length==0){
    //   this.filterTermProfession=[];
    //   console.log('data not found')
    // }else{
    //   console.log(this.filterTermProfession)
    // }
  }
  openSingleDetails(chef:any){
    console.log(chef);
    localStorage.setItem('chef_id',chef.id);
    this.user.chef_id=chef;
    this.router.navigateByUrl('/nav/chef-menu-review')
  }

  testimonialeRes: any;
  testimonialsData: any;

  testimonialsAllData() {
    this.user.present('');
    this.auth.getAllTestimonials().subscribe(res => {
      this.user.dismiss();
      this.testimonialeRes = res;
      this.testimonialsData = this.testimonialeRes.data;
    }, err => {
      this.user.dismiss();
      console.log(err)
    })
  }
  getImage(imgPath:any){
   const endPath= imgPath;
   if(endPath.length==0){
     return '../../../assets/img/user_icon.png';
   }
   else{
     return imgPath;
   }
  }
  getblogImage(imgPath:any){
   const endPath= imgPath;
   if(endPath.length==0){
     return '../../../assets/img/user_icon.png'
   }
   else{
     return imgPath;
   }
  }
latestchefRes:any;
latestchefsData:any;
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
      for(let i=0;i<this.latestEventData.length;i++){
        if(this.latestEventData[i].event_image=="" || this.latestEventData[i].event_image==undefined){
          this.latestEventAllData[i]={
            id: this.latestEventData[i].id,
            date: this.latestEventData[i].date,
            intro: this.latestEventData[i].intro,
            mediaId: this.latestEventData[i].mediaId,
            status:this.latestEventData[i].status,
            location: this.latestEventData[i].location,
            title: this.latestEventData[i].title,
            event_image: '../../../assets/img/event3.png',
          }
        }else{
          this.latestEventAllData[i]={
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
      }
      // console.log(this.latestEventAllData);
    },err=>{
      console.log(err)
    })
  }
  async openEventDetails(ev:any){
    console.log('event open'+ JSON.stringify(ev.id))
   const modal = await this.modalController.create({
     component: EventDetailsComponent,
     componentProps: {ev_data: ev.id}
   });
   return await modal.present();
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
    // this.user.present('');
    this.auth.getAllBlogs().subscribe((data)=>{
      this.user.dismiss();
      // console.log(data);
      this.blogRes=data;
      this.blogDataAll=this.blogRes.data;
    },err=>{
      this.user.dismiss();
      console.log('blog error..')
    })
  }
  blogSingleRes;
  blogSingleData;
  async showBlogModal(blog) {
    let id = blog.id;
    console.log(id)
    this.blogSingleData = "";
    this.auth.getSingleBlogs(id).subscribe(async res => {

      this.blogSingleRes = res;
      console.log(this.blogSingleRes)
      this.blogSingleData = this.blogSingleRes.data;
      console.log(this.blogSingleData);
      const modal = await this.modalController.create({
        component: BlogdetailsComponent,
        componentProps: { blogname: this.blogSingleData }
      });
      return await modal.present();
    }, err => {
      console.log(err)
    })

  }
  viewAllBlogs(){
    this.router.navigateByUrl('nav/blog-all')
  }
  onSlideChange() {
    console.log('slide change');
  }

  async testimonialDetails(testimonial:any){
    // console.log('event open'+ JSON.stringify(testimonial));
    const modal = await this.modalController.create({
      component: TestimonialDetailsComponent,
      componentProps: {testimonial_data: testimonial}
    });
    return await modal.present();
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


  // pickImage(sourceType:any) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
      
  //     this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
      
  //   });
  // }

  // async selectImage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Select Image source",
  //     buttons: [{
  //       text: 'Load from Library',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  //       }
  //     },
  //     {
  //       text: 'Use Camera',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.CAMERA);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  // AppleSignIn() {

  //   this.signInWithApple
  //     .signin({
  //       requestedScopes: [
  //         ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
  //         ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
  //       ]
  //     })
  //     .then((res: AppleSignInResponse) => {
  //       console.log("Apple login success:- " + res);
  //     })
  //     .catch((error: AppleSignInErrorResponse) => {
  //       console.log("Apple Login Error:" + error);
  //     });
  // }
}

