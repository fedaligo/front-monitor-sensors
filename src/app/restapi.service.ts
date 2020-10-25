import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  public userName: any = localStorage.getItem('currentUser');
  public message: any;
  public token: any = localStorage.getItem('auth_token');
  public id: number;
  public sensorsName: string;
  public model: string;
  public rangeFrom: number;
  public rangeTo: number;
  public type: string;
  public unit: string;
  public location: string;
  public description: string;
  public showButton: any = localStorage.getItem('showButton');
  constructor(private http: HttpClient, private router: Router) { }
  showButtonForAdmin(){
    if(this.userName === 'admin'){
      this.showButton = 'admin';
      localStorage.setItem('showButton', 'admin');
    } else {
      this.showButton = null;
      localStorage.removeItem('showButton');
    }
  }
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('showButton');
    this.token = null;
    this.userName = null;
    this.message = null;
  }
  login(userName: string, password: string) {
    this.message = '';
    const body = {userName, password};
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(userName + ':' + password)});
    this.http.post('https://back-monitor-sensors-fed.herokuapp.com/users/authenticate', body, {
      headers,
      responseType: 'text' as 'json'
    }).subscribe((response) => {

      if (response !== '') {
        this.token = response;
        this.userName = userName;
        this.message = '';
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('currentUser', userName);
        this.showButtonForAdmin();
        this.router.navigate(['/table']);
      } else {
        this.router.navigate(['']);
        this.message = 'Incorrect login or password.';
      }
    });
  }

  getTokenFromLocalStorage() {
    this.token = localStorage.getItem('auth_token');
    return this.token;
  }
}
