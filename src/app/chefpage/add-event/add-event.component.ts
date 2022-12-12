import { AddedeventDetailsComponent } from './../addedevent-details/addedevent-details.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController, ActionSheetController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  dataRes: any;
  dataList: any;
  eventListLength: any;
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T05:00:00.000Z';
  formateString = '';
  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public user: UserService,
    public auth: AuthService,
    public common: CommonService,
    public modalController: ModalController,
    public camera: Camera,
    public actionSheetController: ActionSheetController,
    public router: Router) {
    // this.getEventData();
    // this.user.menu();
    this.setToday();
    // console.log(this.user.today);

  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getEventData();
  }


  formateString_api: any;
  setToday() {
    this.formateString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'),
      'dd/MM/yyyy');
    console.log(this.formateString)
  }
  dateChanged(value: any) {
    this.dateValue = value;
    this.formateString = format(parseISO(value), 'dd/MM/yyyy');
    this.formateString_api = format(parseISO(value), 'dd/MM/yyyy');
    this.showPicker = false;
    console.log(this.dateValue);
    console.log(this.formateString);
  }


  croppedImagePath: any;
  imagepath: any = "";
  pickImage(sourceType: any) {
    this.croppedImagePath = '';
    const options: CameraOptions = {
      quality: 20,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((image) => {
      // alert(image);
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagePath = 'data:image/jpeg;base64,' + image;
      this.imagepath = image;
      // alert(JSON.stringify(this.croppedImagePath));

    }, (err) => {
      alert(JSON.stringify(err));

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

  uploadSingleRes: any;
  uploadSingleResData: any;
  multipleImageArray: any = [];
  imageData: any = '';
  img: any;
  uploadImage() {
    let body = {
      // mediafile: this.capturedSnapURL
      mediafile: this.croppedImagePath
    };
    this.user.present('uploading...');
    this.auth.uploadSingleMenuImage(body).subscribe(res => {
      this.user.dismiss();
      this.uploadSingleRes = res;
      this.uploadSingleResData = this.uploadSingleRes.data;
      this.multipleImageArray.push(this.uploadSingleResData.filename);
      this.imageData = this.uploadSingleResData.filename;
      this.img = this.imageData;

      // alert(JSON.stringify(this.uploadSingleResData));
      // alert(JSON.stringify(this.multipleImageArray));

    }, err => {
      this.user.dismiss();
      alert(JSON.stringify(err))
      console.log(err.error)
    })
  }

  getEventData() {
    this.dataList='';
    this.user.present('');
    this.auth.getAddedEvents().subscribe((event) => {
      this.user.dismiss();
      this.dataRes = event;
      this.dataList = this.dataRes.data;
      this.eventListLength = this.dataList.length;
      // console.log(this.dataList);
      // alert(JSON.stringify(this.dataList))
    }, err => {
      this.user.dismiss();
      this.user.showToast('Something went wrong.Please try after sometimes...');
      
    })
  }

  onAddressSubmit(contactAddressForm: any) {
    // console.log(contactAddressForm.value);
    // console.log("form" + JSON.stringify(contactAddressForm.value));
    let event_data = {
      'title': contactAddressForm.value.title,
      'intro': contactAddressForm.value.into,
      'date': this.formateString,
      'userId': localStorage.getItem('user_id'),
      // 'description': contactAddressForm.value.descr,
      'location': 'New Delhi',
      'event_image': this.multipleImageArray,
      'status': '1'
    }
    // alert(JSON.stringify(event_data));
    this.user.present('uploading...')
    this.auth.AddEvents(event_data).subscribe((data) => {
      this.user.dismiss();
      // this.getEventData();
      this.router.navigate(['nav/chef-home']);
      this.user.showToast('Event added successfully..');
    }, err => {
      alert('Event did not added...' + JSON.stringify(err));
      this.user.dismiss();
    })
  }
  async openEventDetails(ev_data) {
    console.log('event open' + JSON.stringify(ev_data))
    const modal = await this.modalController.create({
      component: AddedeventDetailsComponent,
      componentProps: { event_data: ev_data }
    });
    return await modal.present();
  }
}
