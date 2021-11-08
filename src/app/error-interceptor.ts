import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog"
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInceptor implements HttpInterceptor
{
  constructor(private dialog:MatDialog){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {

   return next.handle(req).pipe(
     catchError((err:HttpErrorResponse)=>
     {
      //  console.log(err);
      //  alert(err.error);
      this.dialog.open(ErrorComponent)
       return throwError(err);
     })
   );
  }

}
