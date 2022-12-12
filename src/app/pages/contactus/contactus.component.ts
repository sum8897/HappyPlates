import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  ionicForm: FormGroup;
  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public auth: AuthService,
    public user: UserService) { }

  ngOnInit() { }

  onAddressSubmit(contactForm: any) {
    console.log(contactForm.value);
    if ((contactForm.value.phone).toString().length > 10 || (contactForm.value.phone).toString().length < 10) {
      alert('Please enter valid phone number');
    }
    else {
      let body = {
        username: contactForm.value.fullname,
        phone: contactForm.value.phone,
        email: contactForm.value.email,
        message: contactForm.value.message,
      }
      this.user.present('');
      this.auth.contactUsApi(body).subscribe((data) => {
        this.user.dismiss();
        this.user.showToast('Thanks for submitting the form.We will connect with you soon...');
        this.router.navigate(['nav/mainpage']);
      }, err => {
        this.user.dismiss();
      })
    }
  }
  submitForm() {
    console.log(this.ionicForm.value)


  }
}