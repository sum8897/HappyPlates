import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user_name;
  user_type:any;
  chef_user:boolean;
  menuData
  customer_user:boolean;
  chef_id;
  constructor(  public toast:ToastController,
    public loadingController: LoadingController,) { }
    chefMenuType:any;
  isLoading = false;
           
  async present( msg:any ) {
    this.isLoading = true;
    return await this.loadingController.create({
     message: msg,
     mode:'ios'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }          
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  async showToast(msg){
    let toast =await this.toast.create({
      message: msg,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  
  sideMenu=[];
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
      title : "Profile",
      url   : "/nav/profile",
      icon  : "search-outline",
      role: "customer"
    },
    {
      title : "Order History",
      url   : "/nav/order-history",
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
  user_type1
  menu(){
    this.sideMenu=[];
    this.user_type1=localStorage.getItem('user_role');
      this.NAV.filter((data)=>{
       
        if(data.role===this.user_type1){
             this.sideMenu.push(data)  ;
            }
            return this.sideMenu;
      })
    }
  

}
