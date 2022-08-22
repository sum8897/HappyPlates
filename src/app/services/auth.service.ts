import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest ,HttpParams} from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  databaseObj: SQLiteObject;
  tables = {
    categories: "categories",
    persons: "persons",
    subpersons: "subpersons",
  };

  constructor(private http: HttpClient,
    public router: Router,
    private sqlite: SQLite) { }
  url='http://103.139.58.242/~clientpro/amantran/public/';

  isAuthenticated():any{
    let token = localStorage.getItem('amantran_token')
    let user_type=localStorage.getItem('user_role')
      if (token)
        {
          return true;
      //       if(user_type=="admin"){
      //   console.log('admin')
      //   this.router.navigateByUrl('/nav/chef-home');
       
      // }else{
      //   this.router.navigateByUrl('/nav/mainpage');
       
      // }
          
        } else {
          return false;
        }
  }

  userRegister(body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json ');
    console.log(body)
    console.log(typeof body);
    return this.http.post(this.url + 'api/register', body, { headers: headers }).pipe(tap(res => {
    }))
  }

  loginUser(b: any): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json ');
    return this.http.post(this.url + 'api/login', b, { headers: headers }
    ).pipe(
      tap((res) => {
        // let token = localStorage.setItem('token', res.success.token);
        console.log(res);
      }),
    );
  }
  getMenuData() {
    let token = localStorage.getItem('amantran_token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.url + 'api/menus', { headers: headers }).pipe(tap(res => {
    }))
  }
  getChefMenuData(chef_id) {
    let token = localStorage.getItem('amantran_token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.url + 'api/menus/show/'+chef_id, { headers: headers }).pipe(tap(res => {
    }))
  }

  getAllChefData() {
    let token = localStorage.getItem('amantran_token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.url + 'api/chefs', { headers: headers }).pipe(tap(res => {
    }))
  }
  getSingleChefData(chef_id) {
    let token = localStorage.getItem('amantran_token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.url + 'api/chefs/show/'+chef_id, { headers: headers }).pipe(tap(res => {
    }))
  }
getAllTestimonials(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/testimonials', { headers: headers }).pipe(tap(res => {
  }))
}
getAllLatestChefs(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/users', { headers: headers }).pipe(tap(res => {
  }))
}

getAllEvents(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/events', { headers: headers }).pipe(tap(res => {
  }))
}
getSingleEvents(ev_id){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/events/show/'+ev_id, { headers: headers }).pipe(tap(res => {
  }))
}
getAllBlogs(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/blogs', { headers: headers }).pipe(tap(res => {
  }))
}
 
getSingleBlogs(id){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/blogs/show/'+id, { headers: headers }).pipe(tap(res => {
  }))
}
uploadSingleMenuImage(image){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.url + 'api/uploadmenufile',image, { headers: headers }).pipe(tap(res => {
  }))
}

uploadMenulist(chefmenu){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.url + 'api/menus',chefmenu, { headers: headers }).pipe(tap(res => {
  }))
}

getAboutUs(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/aboutus', { headers: headers }).pipe(tap(res => {
  }))
}
getCart(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/customercarts', { headers: headers }).pipe(tap(res => {
  }))
}

addCartItem(cart_data){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.url + 'api/customercarts',cart_data, { headers: headers }).pipe(tap(res => {
  }))
}
}
