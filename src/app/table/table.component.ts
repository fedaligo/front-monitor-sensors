import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RestapiService} from '../restapi.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {newArray} from '@angular/compiler/src/util';

export interface Sensors {
  id: number;
  sensorsName: string;
  model: string;
  rangeFrom: number;
  rangeTo: number;
  type: string;
  unit: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['edit', 'name', 'model', 'type', 'range', 'unit', 'location', 'delete'];
  data: Sensors[];
  dataSource: MatTableDataSource<Sensors>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public service: RestapiService, private http: HttpClient) {
  }
  ngOnInit() {
    this.getLista();
  }
  getLista(): void {
    this.getSensors().subscribe(lista => {
      this.data = lista;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  getSensors(): Observable<Sensors[]>  {
    return this.http.get<Sensors[]>('https://back-monitor-sensors-fed.herokuapp.com/sensors/allsensors');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteSensor(id) {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.service.getTokenFromLocalStorage()}`});
    this.http.delete('https://back-monitor-sensors-fed.herokuapp.com/sensors/delete/' + id, {
      headers, responseType: 'text' as 'json'
    }).subscribe((response) => {
      this.ngOnInit();
    });
  }
  getInfoOfSensors(id, sensorsName, model, rangeFrom, rangeTo, type, unit, location, description){
    this.service.id = id;
    this.service.sensorsName = sensorsName;
    this.service.model = model;
    this.service.rangeFrom = rangeFrom;
    this.service.rangeTo = rangeTo;
    this.service.type = type;
    this.service.unit = unit;
    this.service.location = location;
    this.service.description = description;
  }
  clearInfoOfSensors(){
    this.service.id = null;
    this.service.sensorsName = null;
    this.service.model = null;
    this.service.rangeFrom = null;
    this.service.rangeTo = null;
    this.service.type = null;
    this.service.unit = null;
    this.service.location = null;
    this.service.description = null;
  }
}


