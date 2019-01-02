import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './body/body.component';
import { ModrenBodyComponent } from './modren-body/modren-body.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [

      { path: '', redirectTo: 'firstView', pathMatch: 'full' },
      { path: 'firstView', component: BodyComponent },
      { path: 'secondView', component: ModrenBodyComponent }


    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
