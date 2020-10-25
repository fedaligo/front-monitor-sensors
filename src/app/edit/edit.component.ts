import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {RestapiService} from '../restapi.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sensors} from '../table/table.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent{
  id: number = this.service.id;
  sensorsName: string = this.service.sensorsName;
  model: string = this.service.model;
  rangeFrom: number = this.service.rangeFrom;
  rangeTo: number = this.service.rangeTo;
  type: string = this.service.type;
  unit: string = this.service.unit;
  location: string = this.service.location;
  description: string = this.service.description;
  typeValues: string[];
  unitValues: string[];
  nameControl = new FormControl('', [
    Validators.required,
  ]);
  modelControl = new FormControl('', [
    Validators.required,
  ]);
  typeControl = new FormControl('', [
    Validators.required,
  ]);
  rangeFromControl = new FormControl('', [
    (control: AbstractControl) => Validators.max(this.rangeTo)(control),
    Validators.required,
  ]);
  rangeToControl = new FormControl('', [
    (control: AbstractControl) => Validators.min(this.rangeFrom)(control),
    Validators.required,
  ]);
  unitControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(public service: RestapiService, private http: HttpClient) {
    this.getType();
    this.getUnit();
  }
  createNewSensor() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.service.getTokenFromLocalStorage()}`});
    const body = {
        sensorsName: this.sensorsName, model: this.model, rangeFrom: this.rangeFrom, rangeTo: this.rangeTo,
        type: this.type, unit: this.unit, location: this.location, description: this.description };
    this.http.post('http://localhost:5000/sensors/create', body, {headers, responseType: 'text' as 'json'}).subscribe((response) => {
      });
  }
  updateSensor() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.service.getTokenFromLocalStorage()}`});
    const body = {id: this.id,
      sensorsName: this.sensorsName, model: this.model, rangeFrom: this.rangeFrom, rangeTo: this.rangeTo,
      type: this.type, unit: this.unit, location: this.location, description: this.description };
    this.http.put('http://localhost:5000/sensors/update', body, {headers, responseType: 'text' as 'json'}).subscribe((response) => {
    });
  }
  getType(){
    this.http.get<string[]>('http://localhost:5000/type/alltypenames').subscribe((response) => {
    this.typeValues = response as string[];
  });
  }
  getUnit(){
    this.http.get<string[]>('http://localhost:5000/unit/allunitnames').subscribe((response) => {
      this.unitValues = response as string[];
    });
  }
}
