import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user_name: any;
  user_type: any;
  chef_user: boolean;
  menuData: any;
  customer_user: boolean;
  chef_id: any;
  today: any;
  constructor(public toast: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AuthService
  ) { }
  chefMenuType: any;
  isLoading = false;

  async present(msg: any) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msg,
      mode: 'ios'
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
  async showToast(msg) {
    let toast = await this.toast.create({
      message: msg,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }
  userRes: any;
  userData: any;
  userAllData: any;
  specialization: any;
  user_location: any;
  user_mobile: any;
  user_city: any;
  user_city_id: any;
  user_state: any;
  user_state_id: any;
  user_country: any;
  user_country_id: any;
  user_first_name: any;
  user_last_name: any;
  user_pin: any;
  user_prof_image: any;
  user_ProfImage: any = '';
  user_email: any;
  user_id: any;
  userDetails() {
    this.user_ProfImage='';
    this.userAllData='';
    if (localStorage.getItem('amantran_token') == null) {
      console.log('user not logged in...')
    } else {
      this.auth.getUserProfile().subscribe((data) => {
        // console.log(data);
        this.userRes = data;
        this.userData = this.userRes.data;
        this.userAllData = this.userData[0];
        this.specialization = this.userAllData.specialization;
        this.user_first_name = this.userAllData.firstname;
        this.user_last_name = this.userAllData.lastname;
        this.user_pin = this.userAllData.pin;
        this.user_prof_image = this.userAllData.prof_image;
        this.user_id = this.userAllData.id;
        localStorage.setItem('user_id', this.user_id)
        // console.log(this.user_prof_image);
        if (this.user_prof_image == "") {
          // console.log('user image not found');
          this.user_ProfImage = '../../assets/img/user_icon.png';
        } else {
          this.user_ProfImage = this.userAllData.prof_image;
          // console.log('user image found');
        }
        this.user_name = this.userAllData.firstname + " " + this.userAllData.lastname;
        localStorage.setItem('user_name', this.user_name);
        this.user_location = this.userAllData.address + " " + this.userAllData.state.state_name + " " + this.userAllData.pin;

        this.user_mobile = this.userAllData.phone;
        this.user_email = this.userAllData.email;
        // console.log(this.userAllData.phone)
        localStorage.setItem('user_mobile', this.user_mobile);
        localStorage.setItem('user_email', this.user_email);
        this.user_city = this.userAllData.city.city_name;
        this.user_city_id = this.userAllData.city.id;
        this.user_state = this.userAllData.state.state_name;
        this.user_state_id = this.userAllData.state.id;
        this.user_country = this.userAllData.country.country_name;
        this.user_country_id = this.userAllData.country.id;
        this.chef_id = this.userAllData.id;
        localStorage.setItem('chef_id',this.chef_id);
        this.chefmenuData(this.chef_id);
      }, err => {
        console.log(err)
      })
    }

  }
  menu_data: any;
  menu_data_list_all: any;
  menu_data_list: any = [];
  chefmenuData(chef_id: any) {
    this.menu_data_list=[];
    if (localStorage.getItem('amantran_token') == null) {
      this.menu_data_list=[];
      console.log('user not logged in...');
    } else {
      // this.present('wait...');
      this.auth.getSingleChefsAllMenu(chef_id).subscribe((data) => {
        // this.dismiss();
        this.menu_data = data;
        this.menu_data_list_all = this.menu_data.data;
        // console.log(this.menu_data_list_all);
        if (this.menu_data_list_all.length == 0) {
          console.log('empty menu data')
        }
        for (let i = 0; i <= this.menu_data_list_all.length; i++) {
          console.log(this.menu_data_list_all[i].medias[0]);
          if (this.menu_data_list_all[i].medias.length < 1 || this.menu_data_list_all[i].medias[0] == undefined) {
            // console.log('empty data');
            this.menu_data_list[i] = {
              'price': this.menu_data_list_all[i].price,
              'title': this.menu_data_list_all[i].title,
              'description': this.menu_data_list_all[i].description,
              'userId': this.menu_data_list_all[i].userId,
              'id': this.menu_data_list_all[i].id,
              'category':this.menu_data_list_all[i].category,
              'food_type':this.menu_data_list_all[i].food_type,
              'menu_image': this.menu_data_list_all[i].menu_image,
              'path': '../../../assets/img/user_icon.png',
            }
            // console.log(this.menu_data_list)
          } else {
            this.menu_data_list[i] = {
              'price': this.menu_data_list_all[i].price,
              'title': this.menu_data_list_all[i].title,
              'description': this.menu_data_list_all[i].description,
              'userId': this.menu_data_list_all[i].userId,
              'id': this.menu_data_list_all[i].id,
              'category':this.menu_data_list_all[i].category,
              'food_type':this.menu_data_list_all[i].food_type,
              'menu_image': this.menu_data_list_all[i].menu_image,
              'path': this.menu_data_list_all[i].medias[0].path,
            }
          }

        }

      }, err => {
        this.dismiss();
        console.log(err)
      })
    }

  }
  deleteMenu(menu_data:any) {
    this.alertController.create({
      header: 'BonHomey Alert!',
      message: 'Are you sure you want to Delete this menu ?',
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: () => {
          console.log('Menu not deleted!');
        }
      }, {
        text: 'Confirm',
        cssClass: 'success',
        handler: () => {
          this.showExitConfirm(menu_data);
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
  
   showExitConfirm(menu){
    console.log(menu);
    this.present('deleting');
    this.auth.deleteMenuByChef(menu.id).subscribe((response)=>{
    this.dismiss();
    const items = this.menu_data_list.filter(item => item.id === menu.id);
    const index = this.menu_data_list.indexOf(items[0]);
    if (index > -1) {
      this.menu_data_list.splice(index, 1);
    }
    alert('Menu Deleted successfully.')
    // console.log(this.user.menu_data_list);
    // console.log(this.user.menu_data_list.length)
    },err=>{
      this.dismiss();
      this.showToast(JSON.stringify(err.errors))
    })
  }




  sideMenu = [];
  NAV = [
    {
      title: "Home",
      url: "/nav/mainpage",
      icon: "home",
      role: "customer"
    },
    {
      title: "About Us",
      url: "/nav/about",
      icon: "browsers-outline",
      role: "customer"
    },
    {
      title: "Contact Us",
      url: "/nav/contactus",
      icon: "people-circle-outline",
      role: "customer"
    },
    {
      title: "Blog",
      url: "/nav/blog",
      icon: "reader-outline",
      role: "customer"
    },
    // {
    //   title : "Team",
    //   url   : "/nav/team",
    //   icon  : "person-add-outline",
    //   role  : "customer"
    // },
    // {
    //   title : "Testimonials",
    //   url   : "/nav/testimonials",
    //   icon  : "chatbox-ellipses-outline",
    //   role  : "customer"
    // },
    // {
    //   title : "FAQ",
    //   url   : "/nav/faq",
    //   icon  : "information-outline",
    //   role  : "customer"
    // },
    {
      title: "Events",
      url: "/nav/event",
      icon: "basketball",
      role: "customer",
    },
    // {
    //   title : "Photo Gallery ",
    //   url   : "/nav/third",
    //   icon  : "image",
    //   role: "customer"
    // },
    // {
    //   title : "Chef Account",
    //   url   : "/nav/chefaccount",
    //   icon  : "call-outline",
    //   role: "customer"
    // },
    {
      title: "Cart",
      url: "/nav/cart",
      icon: "cart-outline",
      role: "customer"
    },
    {
      title: "Profile",
      url: "/nav/profile",
      icon: "person-outline",
      role: "customer"
    },
    {
      title: "Order History",
      url: "/nav/order-history",
      icon: "bag-outline",
      role: "customer"
    },
    {
      title: "Chef Home",
      url: "/nav/chef-home",
      icon: "home-outline",
      role: "chef"
    },
    {
      title: "Add Menu",
      url: "/nav/chef-add-menu",
      icon: "restaurant-outline",
      role: "chef"
    },
    {
      title: "Profile",
      url: "/nav/chef-profile",
      icon: "person-outline",
      role: "chef"
    },
    {
      title: "Events",
      url: "/nav/chef-events",
      icon: "calendar-outline",
      role: "chef"
    },
    {
      title: "Blogs",
      url: "/nav/chef-blogs",
      icon: "book-outline",
      role: "chef"
    },

  ]
  user_type1: any;
  menu() {
    this.sideMenu = [];
    this.user_type1 = localStorage.getItem('user_role');
    this.NAV.filter((data) => {

      if (data.role === this.user_type1) {
        this.sideMenu.push(data);
      }
      return this.sideMenu;
    })
  }


}
