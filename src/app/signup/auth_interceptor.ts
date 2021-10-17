import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { LoginService } from "../login/login.service";

@Injectable()
export class AuthInceptor implements HttpInterceptor
{
  constructor(private authService:LoginService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    //console.log(token)
    let authData:HttpRequest<any>;
    if(token!=""){
    authData = req.clone(
      {
        //setHeaders: {auth: "Bearer "+token}
        headers: req.headers.set('auth', "Bearer "+token)

      }
    );
    }
    else
    {
     authData = req;
    }
   return next.handle(authData);
  }

}
