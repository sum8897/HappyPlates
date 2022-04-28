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


@NgModule({
  declarations: [AppComponent,
                 MainpageComponent,
                 EventsComponent,
                 EventDetailsComponent,
                 LoginComponent,
                 RegisterComponent,
                 OtpComponent,
                ],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            SwiperModule,
            NgOtpInputModule],
  providers: [
    Platform,
    StatusBar,
    SplashScreen,
    Network,
    Camera,
    File,
    SignInWithApple,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
