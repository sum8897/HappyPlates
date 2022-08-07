import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chefaccount',
  templateUrl: './chefaccount.component.html',
  styleUrls: ['./chefaccount.component.scss'],
})
export class ChefaccountComponent implements OnInit {

  constructor(  private router: Router,
    private auth: AuthService,
    private user: UserService) { 
      this.user.menu();
    }

  ngOnInit() {}
  onSubmit(contactForm) {
    console.log(contactForm.value);
  }
  gotoChefmenupage(type){
    this.user.chefMenuType=type;
    console.log(this.user.chefMenuType);
this.router.navigateByUrl('chef-menu-review')
  }

}
