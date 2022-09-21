import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-blog',
  templateUrl: './upload-blog.component.html',
  styleUrls: ['./upload-blog.component.scss'],
})
export class UploadBlogComponent implements OnInit {
  @Input() user_id:any;
  constructor(private auth: AuthService,
              private user:UserService,
              private modalCtrl:ModalController) { }
  today: any;
  ngOnInit() {
    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();

    // this.today = mm + '/' + dd + '/' + yyyy;
    this.today = yyyy +'-'+mm + '-' + dd;
    console.log(this.today);
  }
  onAddressSubmit(contactAddressForm: any) {
    console.log(contactAddressForm.value);
    console.log("form" + JSON.stringify(contactAddressForm.value));
    let blogs_data = {
      'userId': this.user_id,
      'title': contactAddressForm.value.title,
      'intro': contactAddressForm.value.into,
      'date': this.today,
      'description': contactAddressForm.value.descr,
      'status': "1"
    }
    this.user.present('uploading...')
this.auth.postBlogs(blogs_data).subscribe((data)=>{
this.user.dismiss();
this.dismiss();
},err=>{
  this.user.dismiss();
  this.dismiss();
})
  }

  dismiss(){
    this.modalCtrl.dismiss();
      }
}
