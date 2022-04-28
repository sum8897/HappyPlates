import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import SwiperCore, { SwiperOptions } from 'swiper';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';

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
  constructor(private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private signInWithApple: SignInWithApple) { }

  ngOnInit() { }
  onSwiper([swiper]) {
    console.log(swiper);
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
        console.log("Apple Login Error:"+error);
      });
  }
}

