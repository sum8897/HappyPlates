import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './services/user.service';
import { NetworkStatusService } from './services/network-status.service';

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
              public user: UserService,
              public networkProvider:NetworkStatusService
  ) {
    this.initializeApp();
    this.sideMenu();
    this.getDate();
    this.backButtonEvent();
     window.addEventListener('offline',()=>{
       this.openAlert();
     })
 
  }
 ngOnInit(){
  this.sideMenu()
 }
  initializeApp() {
    this.platform.ready().then(()=>{
      this.user.userDetails();
    })
    // alert('initialisation...');
    // if(localStorage.getItem('user_role')=="chef"){
    //   this.router.navigateByUrl('/nav/chef-home')
    // }
    // else if(localStorage.getItem('user_role')=="customer"){
    //   this.router.navigateByUrl('/nav/mainpage')
    // }
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(localStorage.getItem('user_role')=="chef"){
        this.router.navigateByUrl('/nav/chef-home')
      }
      else if(localStorage.getItem('user_role')=="customer"){
        this.router.navigateByUrl('/nav/mainpage')
      }
      else{
        this.router.navigateByUrl('loginpage')
      }

      this.network.onConnect().subscribe(data => {
        this.networkProvider.setNetworkStatus(data.type);
        this.displayNetworkUpdate(data.type);
      }, error => {
        console.log(error);
      });

      this.network.onDisconnect().subscribe(data => {
        console.log(data);
        this.networkProvider.setNetworkStatus(data.type);
        this.displayNetworkUpdate(data.type);
      }, error => {
        console.log(error);
      });
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
    // handler:()=>{
    //   navigator['app'].exitApp();
    // }
  }]
});
await alert.present();
  }
backButtonEvent() {
  if(localStorage.getItem('user_role')=="chef"){
    this.platform.backButton.subscribeWithPriority(10, () => {
      // alert(this.router.url);
      this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
        if (this.router.url != 'nav/chef-home') {
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === 'nav/chef-home') {
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
  else{
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
        // alert(this.router.url);
        if (this.router.url != 'nav/mainpage') {
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === 'nav/mainpage') {
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
 
}
displayNetworkUpdate(connectionState: string) {
  console.log(connectionState)
}
async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'BonHomey Confirmation',
    message: 'Are you sure you want to exit BonHomey App?',
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


getDate(){
  this.user.today = new Date();
  var dd = String(this.user.today.getDate()).padStart(2, '0');
  var mm = String(this.user.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = this.user.today.getFullYear();

  // this.today = mm + '/' + dd + '/' + yyyy;
  this.user.today = yyyy +'-'+mm + '-' + dd;
  console.log(this.user.today);
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

  logout(){
    localStorage.clear();
    localStorage.removeItem('amantran_token');
    this.router.navigateByUrl('login');
  }
 
}