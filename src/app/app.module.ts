import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { NgOtpInputModule } from  'ng-otp-input';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { SwiperModule } from 'swiper/angular';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { SignInWithApple } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { CommonModule } from '@angular/common';
import { BlogdetailsComponent } from './pages/blogdetails/blogdetails.component';
import { ChefaccountComponent } from './pages/chefaccount/chefaccount.component';
import { CartpageComponent } from './pages/cartpage/cartpage.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { AuthService } from './services/auth.service';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { ChefMenuReviewComponent } from './pages/chef-menu-review/chef-menu-review.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { SearchComponent } from './pages/search/search.component';
import { ChefHomeComponent } from './chefpage/chef-home/chef-home.component';
import { ChefprofileComponent } from './chefpage/chefprofile/chefprofile.component';
import { ChefaddmenuComponent } from './chefpage/chefaddmenu/chefaddmenu.component';
import { ViewallchefComponent } from './pages/viewallchef/viewallchef.component';
import { BlogComponent } from './pages/blog/blog.component';
import { MenudetailsComponent } from './pages/menudetails/menudetails.component';
import { OrderHistryComponent } from './pages/order-histry/order-histry.component';
import { EditmenuComponent } from './chefpage/editmenu/editmenu.component';



@NgModule({
  declarations: [AppComponent,
                 MainpageComponent,
                 EventsComponent,
                 EventDetailsComponent,
                 LoginComponent,
                 RegisterComponent,
                 OtpComponent,
                 RegisterComponent,
                 ContactusComponent,
                 BlogdetailsComponent,
                 ChefaccountComponent,
                 CartpageComponent,
                 ProfileComponent,
                 ItemListComponent,
                 FaqComponent,
                 ForgotpassComponent,
                 ChefMenuReviewComponent,
                 PaymentPageComponent,
                 SearchComponent,
                 ChefHomeComponent,
                 ChefprofileComponent,
                 ChefaddmenuComponent,
                 ViewallchefComponent,
                 BlogComponent,
                 MenudetailsComponent,
                 OrderHistryComponent,
                 EditmenuComponent
                ],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            FormsModule,
            SwiperModule,
            NgOtpInputModule,
            CommonModule,
            HttpClientModule,
            ReactiveFormsModule,
            
            
          ],
  providers: [ 

    Platform,
    StatusBar,
    SplashScreen,
    Network,
    Camera,
    File,
    SignInWithApple,
    SQLite,
    AuthService,
    AuthGuardGuard,

   
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
