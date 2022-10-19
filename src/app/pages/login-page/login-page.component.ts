import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  user_response:any;
  user_response_data:any;
  user_token:any;
  user_name:any;
  user_type:any;
  constructor(private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private user: UserService
  ) { }

  ngOnInit() { }
  openSignUp() {
    this.router.navigateByUrl('/register')
  }
  forgetPass() {
    this.router.navigateByUrl('/forgotpass')
  }
  onSubmit(contactForm:any) {
    console.log(contactForm.value);
    console.log("form" + JSON.stringify(contactForm.value));
    let userBody = {
      "username": contactForm.value.email,
      "password": contactForm.value.password
    }
    if (contactForm.value.email === false) {
      alert('please enter Email Id');
    }
    else if (contactForm.value.email = "" || contactForm.value.password == "") {
      alert('Please enter user Id and Password.');
    } else {
   
       if(this.checkValue==false){
       console.log(this.checkValue);
       alert('')
       }else{
       console.log('true...');
       }
      this.user.present('wait...');
      this.auth.loginUser(userBody).subscribe(data => {
        this.user.dismiss();
        this.user.sideMenu = [];
        console.log(data);
        this.user_response_data = data;
        this.user_response = this.user_response_data.success;
        this.user_token = this.user_response.token;
        localStorage.setItem('amantran_token', this.user_token);
        this.user_name = this.user_response.user;
        this.user.user_type = (this.user_response.user_role).toLowerCase();
        this.user.user_name = this.user_name;
        localStorage.setItem('user_name', this.user.user_name);
        localStorage.setItem('user_role', this.user.user_type);
        this.user_type = localStorage.getItem('user_role');
        localStorage.setItem('password', contactForm.value.password)
        this.user.NAV.filter((data) => {

          if (data.role === this.user_type) {
            this.user.sideMenu.push(data);
          }
          return this.user.sideMenu;
        })
        console.log(this.user.sideMenu);
        if (this.user.user_type == "chef") {
          this.user.chef_user = true;
          this.user.customer_user = false;
          this.router.navigateByUrl('/nav/chef-home')
        } else {
          this.user.customer_user = true;
          this.user.chef_user = false;
          this.router.navigateByUrl('/nav/mainpage')
        }

      }, err => {
        console.log(err)
        this.user.showToast(JSON.stringify(err.error.message));
        this.user.dismiss();
      })


    }

  }
  checkValue: any;
  checkedValue(e: any) {
    console.log(e.detail.checked);
    this.checkValue = e.detail.checked;
  }
}

