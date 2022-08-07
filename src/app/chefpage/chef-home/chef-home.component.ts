import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chef-home',
  templateUrl: './chef-home.component.html',
  styleUrls: ['./chef-home.component.scss'],
})
export class ChefHomeComponent implements OnInit {

  constructor(public user: UserService) { 
    this.user.menu();
  }

  ngOnInit() {}

}
