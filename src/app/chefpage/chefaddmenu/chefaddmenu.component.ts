import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chefaddmenu',
  templateUrl: './chefaddmenu.component.html',
  styleUrls: ['./chefaddmenu.component.scss'],
})
export class ChefaddmenuComponent implements OnInit {

  constructor(public user: UserService) { 
    this.user.menu();
  }

  ngOnInit() {}

}
