import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  constructor(
    private alertController: AlertController,
              private location: Location,
              private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private router : Router,
              private network: Network,
  ) {
    this.sideMenu();
    this.initializeApp();
    this.backButtonEvent();
    //  this.NetworkButtonEvent()
     window.addEventListener('offline',()=>{
       this.openAlert();
     })
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
        icon  : "home"
      },
      {
        title : "About Us",
        url   : "/about",
        icon  : "browsers-outline"
      },
      {
        title : "Contact Us",
        url   : "/contactus",
        icon  : "people-circle-outline"
      },
      {
        title : "Blog",
        url   : "/blog",
        icon  : "reader-outline"
      },
      {
        title : "Team",
        url   : "/team",
        icon  : "person-add-outline"
      },
      {
        title : "Testimonials",
        url   : "/testimonials",
        icon  : "chatbox-ellipses-outline"
      },
      {
        title : "FAQ",
        url   : "/faq",
        icon  : "information-outline"
      },
      {
        title : "Events",
        url   : "/event",
        icon  : "basketball"
      },
      {
        title : "Photo Gallery ",
        url   : "/third",
        icon  : "image"
      },
      {
        title : "Chef Account",
        url   : "/chefaccount",
        icon  : "call-outline"
      },
      {
        title : "Cart",
        url   : "/cart",
        icon  : "cart-outline"
      },
      {
        title : "Search",
        url   : "/search",
        icon  : "search-outline"
      },
    ]
  }
  logout(){
    localStorage.clear();
    localStorage.removeItem('amantran_token');
    this.router.navigate(['login']);
  }
}
