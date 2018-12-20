import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {
    path:'login',
    loadChildren:'./public/public.module#PublicModule'
  },
  {
    path:'home',
    loadChildren:'./private/private.module#PrivateModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
