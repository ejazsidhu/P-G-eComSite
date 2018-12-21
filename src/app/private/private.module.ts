import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../public/layout/navbar/navbar.component';
import { BodyComponent } from './body/body.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrivateRoutingModule,
    // BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MultiSelectModule,
    DropdownModule,
    NgxPaginationModule,
    CalendarModule,
    AccordionModule,
    Ng2SearchPipeModule
  ],
  declarations: [HomeComponent, NavbarComponent, BodyComponent]
})
export class PrivateModule { }
