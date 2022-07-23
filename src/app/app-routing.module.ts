import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { BlogComponent } from './pages/blog/blog.component';
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
import { LoginComponent } from './pages/login/login.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { OtpComponent } from './pages/otp/otp.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthGuardGuard } from './services/auth-guard.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'mainpage',
    pathMatch: 'full'
  },
  { path: 'mainpage', component: MainpageComponent, canActivate: [AuthGuardGuard]},
  {
    path:'mainpage',
    component: MainpageComponent
  },
  {
    path: 'event',
    component: EventsComponent
  },
  {
    path:'event-details',
    component: EventDetailsComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'otp',
    component: OtpComponent
  },
  {
    path:'contactus',
    component: ContactusComponent
  },
  {
    path:'about',
    component: AboutusComponent
  },
  {
    path:'blog',
    component: BlogComponent
  },
  {
    path:'blog-details',
    component: BlogdetailsComponent
  },
  {
    path:'chefaccount',
    component: ChefaccountComponent
  },
  {
    path:'cart',
    component: CartpageComponent
  },
  {
    path:'item-list',
    component: ItemListComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'faq',
    component: FaqComponent
  },
  {
    path:'chef-menu-review',
    component: ChefMenuReviewComponent
  },
{
  path:'payment',
  component: PaymentPageComponent
},
{
  path:'search',
  component: SearchComponent
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
