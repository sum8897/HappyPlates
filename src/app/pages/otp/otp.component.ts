import { Component, OnInit, ViewChild } from '@angular/core';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  
  otp: string;
  showOtpComponent = true;
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  constructor(public user:UserService) { }

  ngOnInit() {}
  onOtpChange(ev){
    console.log(ev)
    if(ev==""){
      console.log('Please Enter OTP ')
    }else{
      console.log(ev)
    }
  }
}
