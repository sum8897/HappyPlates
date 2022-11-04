import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.scss'],
})
export class AddBlogsComponent implements OnInit {

  dataRes:any;
  dataList:any;
  eventListLength:any;
  showPicker=false;
  dateValue=format(new Date(),'yyyy-MM-dd')+'T05:00:00.000Z';
  formateString='';
  @ViewChild(IonDatetime) datetime:IonDatetime;
  constructor(private user: UserService,
    private auth: AuthService,
    private common: CommonService,) {
      this.user.menu();
      this.setToday();
    console.log(this.user.today);
    this.getEventData();
  }

  ngOnInit() { }




formateString_api:any;
setToday(){
  this.formateString = format(parseISO(format(new Date (),'yyyy-MM-dd')+'T09:00:00.000Z'),
                      'yyyy-MM-dd');
                      console.log(this.formateString)
}
dateChanged(value:any){
this.dateValue=value;
this.formateString=format(parseISO(value),'yyyy-MM-dd');
this.formateString_api=format(parseISO(value),'yyyy-MM-dd');
this.showPicker=false;
console.log(this.dateValue);
console.log(this.formateString);
}

  getEventData() {
    this.user.present('');
    this.auth.getAddedEvents().subscribe((event) => {
      this.user.dismiss();
      this.dataRes=event;
      this.dataList=this.dataRes.data;
      this.eventListLength=this.dataList.length;
      console.log(this.dataList.length);

    }, err => {
      this.user.dismiss();
    })
  }

  onAddressSubmit(contactAddressForm: any) {
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));
        let blogs_data = {
          'title': contactAddressForm.value.title,
          'intro': contactAddressForm.value.into,
          'date': this.formateString_api,
          'userId': localStorage.getItem('user_id'),
          'description': contactAddressForm.value.descr,
          'location':'New Delhi',
          'mediaId': 1,
          'status': '1'
        }
        this.user.present('uploading...')
    this.auth.AddEvents(blogs_data).subscribe((data)=>{
    this.user.dismiss();
    this.getEventData();
    this.user.showToast('Event added successfully..');
    },err=>{
      this.user.dismiss();
    })
  }

}
