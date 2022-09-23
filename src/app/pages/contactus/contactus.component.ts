import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  ionicForm: FormGroup;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {}
  submitForm() {
    console.log(this.ionicForm.value)
  }
}
