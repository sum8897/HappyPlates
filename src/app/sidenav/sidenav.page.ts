import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {

  active = '';
  sideMenu=[]
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
    // {
    //   title : "Chef Account",
    //   url   : "/nav/chefaccount",
    //   icon  : "call-outline",
    //   role: "customer"
    // },
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
        icon  : "home-outline",
        role: "chef"
      },
      {
        title : "Add Menu",
        url   : "/nav/chef-add-menu",
        icon  : "restaurant-outline",
        role: "chef"
      },
      {
        title : "Profile",
        url   : "/nav/chef-profile",
        icon  : "person-outline",
        role: "chef"
      },
      {
        title : "Events",
        url   : "/nav/cheg-events",
        icon  : "person-outline",
        role: "chef"
      },
      {
        title : "Blogs",
        url   : "/nav/chef-blogs",
        icon  : "person-outline",
        role: "chef"
      },

  ]
  user_type;
  constructor(private router: Router,
    public menuCtrl: MenuController,
    public user: UserService) {
      this.user.user_name=localStorage.getItem('user_name'); 
    this.user_type=localStorage.getItem('user_role');
    this.NAV.filter((data)=>{
      if(data.role===this.user_type){
           this.sideMenu.push(data)  ;
          }
          return this.sideMenu;
    })
    console.log(this.sideMenu)
    if(this.sideMenu.length===0){
      console.log('length zero');
      this.router.navigateByUrl('loginpage')
    }else{
      console.log('length found');
      this.router.events.subscribe((event: RouterEvent) => {

        this.active = event.url
      });
    }

  
  }

  ngOnInit() { 
    this.user.userDetails();
  }
  logout(){
    localStorage.clear();
    localStorage.removeItem('amantran_token');
    this.menuCtrl.close();
    this.router.navigate(['loginpage']);
  }
  editProfile(){
    this.router.navigateByUrl('profile')
  }

}