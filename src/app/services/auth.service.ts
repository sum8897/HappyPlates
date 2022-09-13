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


  getAllChefData() {
    let token = localStorage.getItem('amantran_token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.url + 'api/chefs', { headers: headers }).pipe(tap(res => {
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
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/blogs/show/'+id, { headers: headers }).pipe(tap(res => {
  }))
}
uploadSingleMenuImage(image){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.url + 'api/uploadmenufile',image, { headers: headers }).pipe(tap(res => {
  }))
}

uploadMenulist(chefmenu){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.url + 'api/menus',chefmenu, { headers: headers }).pipe(tap(res => {
  }))
}

getAboutUs(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/aboutus', { headers: headers }).pipe(tap(res => {
  }))
}
getCart(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/customercarts', { headers: headers }).pipe(tap(res => {
  }))
}

addCartItem(cart_data:any){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.url + 'api/customercarts',cart_data, { headers: headers }).pipe(tap(res => {
  }))
}


deleteCartItem(item_id:any){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.url + 'api/customercarts/customercarts/'+item_id, { headers: headers }).pipe(tap(res => {
  }))
}

getSingleChefDataProfile(chef_id:any) {
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/chefs/show/'+chef_id, { headers: headers }).pipe(tap(res => {
  }))
}
  //''' particular chef all menus 
getSingleChefsAllMenu(chef_id:any){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/menus/chefmenulist/'+chef_id, { headers: headers }).pipe(tap(res => {
  }))
}
  // show menu details
getSingleMenuDetails(menu_id:any) {
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/menus/show/'+menu_id, { headers: headers }).pipe(tap(res => {
  }))
}

getUserProfile() {
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append('Authorization', 'Bearer'+' '+ token);
  console.log(headers);
  return this.http.get(this.url + 'api/users/details', { headers: headers }).pipe(tap(res => {
  }))
}


checkoutApi(check_data:any){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append("Authorization", 'Bearer'+' '+ token);
  return this.http.post(this.url + 'api/checkout',check_data, { headers: headers }).pipe(tap(res => {
  }))
}

orderHistroty(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append("Authorization", 'Bearer'+' '+ token);
  return this.http.get(this.url + 'api/orders/history', { headers: headers }).pipe(tap(res => {
  }))
}
updateProfileData(check_data:any){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append("Authorization", 'Bearer'+' '+ token);
  return this.http.put(this.url + 'api/users/users',check_data, { headers: headers }).pipe(tap(res => {
  }))
}
getChefOrders() {
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append('Authorization', 'Bearer'+' '+ token);
  console.log(headers);
  return this.http.get(this.url + 'api/orders/cheforder', { headers: headers }).pipe(tap(res => {
  }))
}
passwordUpdate(check_data:any){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append("Authorization", 'Bearer'+' '+ token);
  return this.http.post(this.url + 'api/users/changepassword',check_data, { headers: headers }).pipe(tap(res => {
  }))
}

deleteMenuByChef(menu_id:any){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append("Authorization", 'Bearer'+' '+ token);
  return this.http.delete(this.url + 'api/menus/menu/'+menu_id,{ headers: headers }).pipe(tap(res => {
  }))
}
editMenuByChef(check_data:any,id){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept-Encoding', 'gzip,deflate,br');
  headers = headers.append('Connection', 'keep-alive');
  headers = headers.append("Authorization", 'Bearer'+' '+ token);
  return this.http.put(this.url + 'api/menus/menu/'+id,check_data, { headers: headers }).pipe(tap(res => {
  }))
}
}
