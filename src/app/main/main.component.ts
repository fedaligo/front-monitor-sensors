import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  hide = true;
  userName: string;
  password: string;
  loginFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  message: any = 'Incorrect login or password.';
  constructor(public service: RestapiService) { }
  doLogin(){
    const resp = this.service.login(this.userName, this.password);
  }
}
