import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanLoad {
user_type:any;
  constructor (private navCtrl: NavController,
     private auth: AuthService){
    this.user_type=localStorage.getItem('user_role');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  // async canActivate(): Promise<boolean> {
  //   const authed = await this.auth.isAuthenticated();
  //   if (authed) {
  //     console.log('if true its automatically router on given full path in app-routing.module.');
  //     return true;
     
  //   } else {
  //     console.log('false means token not available then we can route on login page again');
  //     this.navCtrl.navigateRoot('/nav/login');
  //     return false;
  //   }
  // }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
