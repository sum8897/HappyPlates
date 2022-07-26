import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user_response;
  user_response_data;
  user_token;
  user_name;
  user_type;
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
  onSubmit(contactForm) {
    console.log(contactForm.value);
    console.log("form" + JSON.stringify(contactForm.value));
    let userBody = {
      "email": contactForm.value.email,
      "password": contactForm.value.password
    }
    if(contactForm.value.email="" || contactForm.value.password==""){
      alert('Please enter user Id and Password.')
    }else{

   this.user.present('wait...');
    this.auth.loginUser(userBody).subscribe(data => {
      this.user.dismiss();
      console.log(data);
      this.user_response_data = data;
      this.user_response = this.user_response_data.success;
      this.user_token = this.user_response.token;
      localStorage.setItem('amantran_token', this.user_token);
      this.user_name = this.user_response.user;
      this.user.user_type = this.user_response.user_role;
      this.user.user_name=this.user_name;
      localStorage.setItem('user_name', this.user.user_name);
      localStorage.setItem('user_role', this.user.user_type);
      if(this.user.user_type=="admin"){
        this.user.chef_user=true;
        this.user.customer_user=false;
        this.router.navigateByUrl('/chef-home')
      }else{
        this.user.customer_user=true;
        this.user.chef_user=false;
        this.router.navigateByUrl('/mainpage')
      }
     
    }, err => {
    this.user.dismiss();
    })
  }

  }
}
