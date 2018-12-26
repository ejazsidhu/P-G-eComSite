import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from './_service/general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private generalService:GeneralService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(this.generalService.isUserExist)
      return true
      else{
        this.router.navigate(['/login'], {
          // queryParams: {
          //   return: state.url
          // }
        });
  
        return false;
      }


    return true;
  }
}
