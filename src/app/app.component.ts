import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, {static: true}) routeroutlet: IonRouterOutlet;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  navigate : any;
  navigateChef: any;
  user_type;
 
  menuData:any=[];

  constructor(
    private alertController: AlertController,
              private location: Location,
              private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private router : Router,
              private network: Network,
              public user: UserService
  ) {
    this.user.user_type=localStorage.getItem('user_role');
    this.user.user_name=localStorage.getItem('user_name');
    
    console.log(this.user.user_name)
    // this.sideMenu();
    // this.sideMenuAdmin();
    this.initializeApp();
    this.backButtonEvent();
    if(this.user.user_type=="admin"){
      this.sideMenuAdmin();
    this.user.chef_user=true;
    this.user.customer_user=false;
    console.log("admin chef user")
    }else{
      this.sideMenu();
      this.user.chef_user=false;
    this.user.customer_user=true;
    }
    
    // this.menuData=this.navigate.filter(data=>{
    //   if(data.role==this.user_type){
    //     console.log(typeof(data))
    //     return this.menuData  ;
    //   }
    // })

    //  this.NetworkButtonEvent()
     window.addEventListener('offline',()=>{
       this.openAlert();
     })
     //console.log(this.navigate)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  NetworkButtonEvent(){
    this.platform.backButton.subscribeWithPriority(111,()=>{
    
     // this.router.navigate(['']) 
     navigator["app"].exitApp;
    })
  }
 async openAlert(){
const alert=await this.alertController.create({
  header: 'Check Network Connection',
  message: 'You do not have Internet Connection',
  buttons:[{
    text:'ok',
    handler:()=>{
      navigator['app'].exitApp();
    }
  }]
});
await alert.present();
  }
backButtonEvent() {
  this.platform.backButton.subscribeWithPriority(0, () => {
    this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
      if (this.router.url != '/home') {
        // await this.router.navigate(['/']);
        await this.location.back();
      } else if (this.router.url === '/home') {
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentAlertConfirm();
        } else {
          navigator['app'].exitApp();
        }
      }
    });
  });
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Happy Plates Confirmation',
    message: 'Are you sure you want to exit Happy Plates App?',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: (blah) => {}
    }, {
      text: 'Close App',
      handler: () => {
        navigator['app'].exitApp();
      }
    }]
  });

  await alert.present();
}



  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/mainpage",
        icon  : "home",
        role  : "customer"
      },
      {
        title : "About Us",
        url   : "/about",
        icon  : "browsers-outline",
        role  : "customer"
      },
      {
        title : "Contact Us",
        url   : "/contactus",
        icon  : "people-circle-outline",
        role  : "customer"
      },
      {
        title : "Blog",
        url   : "/blog",
        icon  : "reader-outline",
        role  : "customer"
      },
      {
        title : "Team",
        url   : "/team",
        icon  : "person-add-outline",
        role  : "customer"
      },
      {
        title : "Testimonials",
        url   : "/testimonials",
        icon  : "chatbox-ellipses-outline",
        role  : "customer"
      },
      {
        title : "FAQ",
        url   : "/faq",
        icon  : "information-outline",
        role  : "customer"
      },
      {
        title : "Events",
        url   : "/event",
        icon  : "basketball",
         role: "customer",
      },
      {
        title : "Photo Gallery ",
        url   : "/third",
        icon  : "image",
        role: "customer"
      },
      {
        title : "Chef Account",
        url   : "/chefaccount",
        icon  : "call-outline",
        role: "customer"
      },
      {
        title : "Cart",
        url   : "/cart",
        icon  : "cart-outline",
        role: "customer"
      },
      {
        title : "Search",
        url   : "/search",
        icon  : "search-outline",
        role: "customer"
      },

    ]
  
  }
  sideMenuAdmin()
  {
    this.navigateChef =
    [
      {
        title : "Chef Home",
        url   : "/chef-home",
        icon  : "search-outline",
        role: "admin"
      },
      {
        title : "Add Menu",
        url   : "/chef-add-menu",
        icon  : "search-outline",
        role: "admin"
      },
      {
        title : "Chef Profile",
        url   : "/chef-profile",
        icon  : "search-outline",
        role: "admin"
      },
    ]
  
  }
  logout(){
    localStorage.clear();
    localStorage.removeItem('amantran_token');
    this.router.navigateByUrl('login');
  }
}
