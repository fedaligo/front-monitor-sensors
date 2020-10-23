import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatListModule} from '@angular/material/list';
import { MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {RouterModule, Routes} from '@angular/router';
import { MatRadioModule} from '@angular/material/radio';
import { MainComponent } from './main/main.component';
import { EditComponent } from './edit/edit.component';
import { TableComponent } from './table/table.component';
import {MatSelectModule} from '@angular/material/select';


const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'edit', component: EditComponent},
  { path: 'table', component: TableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EditComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    CdkTableModule,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatChipsModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
