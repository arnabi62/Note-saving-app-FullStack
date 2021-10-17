import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate{

  constructor(private authservice:LoginService, private router:Router){}
  canActivate(router:ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean | Observable<boolean> | Promise<boolean>
  {
    const isAuth = this.authservice.getAuth();
    if(!isAuth)
    {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
