import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {

  active = '';

  NAV = [
    {
      title : "Home",
      url   : "/nav/mainpage",
      icon  : "home",
      role  : "customer"
    },
    {
      title : "About Us",
      url   : "/nav/about",
      icon  : "browsers-outline",
      role  : "customer"
    },
    {
      title : "Contact Us",
      url   : "/nav/contactus",
      icon  : "people-circle-outline",
      role  : "customer"
    },
    {
      title : "Blog",
      url   : "/nav/blog",
      icon  : "reader-outline",
      role  : "customer"
    },
    {
      title : "Team",
      url   : "/nav/team",
      icon  : "person-add-outline",
      role  : "customer"
    },
    {
      title : "Testimonials",
      url   : "/nav/testimonials",
      icon  : "chatbox-ellipses-outline",
      role  : "customer"
    },
    {
      title : "FAQ",
      url   : "/nav/faq",
      icon  : "information-outline",
      role  : "customer"
    },
    {
      title : "Events",
      url   : "/nav/event",
      icon  : "basketball",
       role: "customer",
    },
    {
      title : "Photo Gallery ",
      url   : "/nav/third",
      icon  : "image",
      role: "customer"
    },
    {
      title : "Chef Account",
      url   : "/nav/chefaccount",
      icon  : "call-outline",
      role: "customer"
    },
    {
      title : "Cart",
      url   : "/nav/cart",
      icon  : "cart-outline",
      role: "customer"
    },
    {
      title : "Search",
      url   : "/nav/search",
      icon  : "search-outline",
      role: "customer"
    },
          {
        title : "Chef Home",
        url   : "/nav/chef-home",
        icon  : "search-outline",
        role: "admin"
      },
      {
        title : "Add Menu",
        url   : "/nav/chef-add-menu",
        icon  : "search-outline",
        role: "admin"
      },
      {
        title : "Chef Profile",
        url   : "/nav/chef-profile",
        icon  : "search-outline",
        role: "admin"
      },

  ]
  user_type;
  constructor(private router: Router,
    public menuCtrl: MenuController) {
    this.user_type=localStorage.getItem('user_role');
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url
    });
    this.NAV.filter((data)=>{

      return data.role===this.user_type;
    })
    console.log(this.NAV)
  }

  ngOnInit() { }
  logout(){
    localStorage.clear();
    localStorage.removeItem('amantran_token');
    this.menuCtrl.close();
    this.router.navigate(['nav/login']);
  }
}