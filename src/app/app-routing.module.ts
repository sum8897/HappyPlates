import { ChefuserprofileComponent } from './pages/chefuserprofile/chefuserprofile.component';
import { AddEventComponent } from './chefpage/add-event/add-event.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChefHomeComponent } from './chefpage/chef-home/chef-home.component';
import { ChefaddmenuComponent } from './chefpage/chefaddmenu/chefaddmenu.component';
import { ChefprofileComponent } from './chefpage/chefprofile/chefprofile.component';
import { EditmenuComponent } from './chefpage/editmenu/editmenu.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { BlogComponent } from './pages/blog/blog.component';
// import { BlogallComponent } from './pages/blogall/blogall.component';
import { BlogdetailsComponent } from './pages/blogdetails/blogdetails.component';
import { CartpageComponent } from './pages/cartpage/cartpage.component';
import { ChefMenuReviewComponent } from './pages/chef-menu-review/chef-menu-review.component';
import { ChefaccountComponent } from './pages/chefaccount/chefaccount.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { EventsComponent } from './pages/events/events.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './pages/login/login.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MenudetailsComponent } from './pages/menudetails/menudetails.component';
import { OrderHistryComponent } from './pages/order-histry/order-histry.component';
import { OtpComponent } from './pages/otp/otp.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { ViewallchefComponent } from './pages/viewallchef/viewallchef.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AddBlogsComponent } from './chefpage/add-blogs/add-blogs.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./sidenav/sidenav.module').then(m => m.SidenavPageModule)
  },

  // {
  //   path: '',
  //   redirectTo: 'loginpage',
  //   pathMatch: 'full'
  // },
  // { 
  //   path: 'mainpage', 
  // component: MainpageComponent,
  //  canActivate: [AuthGuardGuard]
  // },
  {
    path: 'nav/mainpage',
    component: MainpageComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'event',
    component: EventsComponent
  },
  {
    path: 'nav/event-details',
    component: EventDetailsComponent
  },
  {
    path: 'nav/login',
    component: LoginComponent
  },
  {
    path: 'loginpage',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path: 'nav/about',
    component: AboutusComponent
  },

  // {
  //   path: 'nav/blog-all',
  //   component: BlogallComponent
  // },
  {
    path: 'chefaccount',
    component: ChefaccountComponent
  },
  {
    path: 'cart',
    component: CartpageComponent
  },
  {
    path: 'item-list',
    component: ItemListComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'chefprofile',
    component: ChefuserprofileComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'chef-menu-review',
    component: ChefMenuReviewComponent
  },
  {
    path: 'payment',
    component: PaymentPageComponent
  },
  {
    path:'nav/viewallchef',
    component: ViewallchefComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'chef-home',
    component: ChefHomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'chef-add-menu',
    component: ChefaddmenuComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'chef-profile',
    component: ChefprofileComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'nav/chef-events',
    component: AddEventComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'nav/chef-blogs',
    component: AddBlogsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path:'nav/blog-all',
    component: BlogComponent
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
