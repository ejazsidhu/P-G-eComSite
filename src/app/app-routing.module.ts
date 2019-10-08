import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { ShopDetailComponent } from './private/shop-detail/shop-detail.component';
import { SingleShopComponent } from './private/single-shop/single-shop.component';

const routes: Routes = [

  { path: 'shop/:id', component: ShopDetailComponent },
  { path: 'single_shop/:id', component: SingleShopComponent },

  {path:'',redirectTo:'login',pathMatch:'full'},
  {
    path:'login',
    loadChildren:'./public/public.module#PublicModule',
    //  canActivate:[AuthGuard] 
  },
 
  {
    path:'home',
    loadChildren:'./private/private.module#PrivateModule',
  }  ,
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
