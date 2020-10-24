import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  public userName: any;
  public role: any;
  public responseUserByUserName: any;
  public message: any;
  public token: any;
  public name: any;
  public model: any;
  public range1: any = 12;
  public range2: any = 45;
  public type: any;
  public unit: any;
  public location: any;
  public description: any;
  constructor(private http: HttpClient) { }
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('roleAdmin');
    localStorage.removeItem('currentUser');
    this.responseUserByUserName = null;
    this.role = null;
    this.userName = null;
  }
  login(userName: string, password: string) {
    this.message = '';
    const body = {userName, password};
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(userName + ':' + password)});
    this.http.post('http://localhost:5000/users/authenticate', body, {
      headers,
      responseType: 'text' as 'json'
    }).subscribe((response) => {

      if (response !== '') {
        this.token = response;
        this.userName = userName;
        this.message = '';
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('currentUser', userName);
        this.getRole();
      } else {
        this.message = 'Incorrect login or password.';
      }
    });
  }
  getRole() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get('http://localhost:5000/users/usersrole', {
      headers,
      responseType: 'text' as 'json'
    }).subscribe((response) => {
      if (response === '[administrator]') {
        this.role = response;
        localStorage.setItem('roleAdmin', this.role);
      }
    });
  }
  getTokenFromLocalStorage() {
    this.token = localStorage.getItem('auth_token');
    return this.token;
  }
}
