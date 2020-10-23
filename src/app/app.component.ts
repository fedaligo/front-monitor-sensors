import { Component } from '@angular/core';
import {RestapiService} from './restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = '';
  title = 'front-monitor-sensors';
  constructor(public service: RestapiService) {}
}
