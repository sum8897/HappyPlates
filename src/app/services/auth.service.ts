import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest ,HttpParams} from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

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
    private sqlite: SQLite) { }
  url='http://103.139.58.242/~clientpro/amantran/public/';

  isAuthenticated():any{
    let token = localStorage.getItem('amantran_token')
      if (token)
        {
          return true;
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
getAllBlogs(){
  let token = localStorage.getItem('amantran_token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.url + 'api/blogs', { headers: headers }).pipe(tap(res => {
  }))
}
 

  
}
