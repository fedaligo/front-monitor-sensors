import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {RestapiService} from '../restapi.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent{
  options: string[] = ['ROLE_ADMIN', 'ROLE_USER'];
  nameControl = new FormControl('', [
    Validators.required,
  ]);
  modelControl = new FormControl('', [
    Validators.required,
  ]);
  typeControl = new FormControl('', [
    Validators.required,
  ]);
  unitControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(public service: RestapiService, private http: HttpClient) { }
}
