import { Injectable } from '@angular/core';
import { User } from '../signup/user';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token:string="";
  isAuthenticated = false;
  private authlistener= new Subject<boolean>();
  name:string="";
  id:string="";
  timer :any;
  constructor(private httpClient:HttpClient, private router:Router) { }
  login(email:string, pass:string)
  {
    const user:User = {name : "", email:email, password:pass}
    this.httpClient.post<{token:string, name:string, id:string, expiresIn:number}>(environment.apiUrl+"user/login", user).subscribe(
      (res: any)=>{
        this.token = res.token;
        if(this.token!=""){
        this.isAuthenticated = true;
      this.authlistener.next(true);
      this.name=res.name;
      const exireDuration = res.expiresIn;
      this.id=res.id;
      this.setTimer(exireDuration);
      const now = new Date();
      const expireDate = new Date(now.getTime()+exireDuration*1000)
      this.saveData(this.token, expireDate, this.id);
      console.log(exireDuration+" "+this.name+" "+expireDate);
      this.router.navigate(['/'])// this.name]);

        }

      },
      error=>
      {
        this.authlistener.next(false);

      })
  }

  getname()
  {

      return this.name;

  }
  getid()
  {
    return this.id;
  }
logout()
{
  this.token="";
  this.id = "";
  this.isAuthenticated=false;
  this.authlistener.next(false);
  clearTimeout(this.timer);
  this.clearData();
  this.router.navigate(['/']);
}
  getToken=()=>{return this.token};
  getAuth()
  {
    return this.isAuthenticated;
  }
    getListention()
    {
      return this.authlistener.asObservable();
    }

    private saveData(token:string, expiredDate:Date, id:string)
    {
      localStorage.setItem("token", token);
      localStorage.setItem("expireDate", expiredDate.toISOString());
      localStorage.setItem("userId", id);
    }
    private clearData()
    {
      localStorage.removeItem("token");
      localStorage.removeItem("expireDate");
      localStorage.removeItem("userId");
    }

    private getAuthData()
    {
      const token = localStorage.getItem("token");
      const expireDate = localStorage.getItem("expireDate");
      const userId = localStorage.getItem("userId");
      if(!token ||token=="" || !expireDate)
        return;
      return(
        {
          token:token,
          expireDate:new Date(expireDate),
          userId: userId
        }
      )
    }

    autoAuthUser()
    {
        const userInfo = this.getAuthData();
        const now = new Date();
        if(!userInfo)
        {
          return;
        }
        const isFuture=  (userInfo?.expireDate.getTime()! - now.getTime());
        if(isFuture>0)
        {
            this.token = userInfo?.token!;
            this.id = userInfo?.userId!;
            this.isAuthenticated = true;
            this.authlistener.next(true);
            this.setTimer(isFuture/1000);
        }
    }

    private setTimer(exireDuration:number)
    {
      console.log(exireDuration)
      this.timer= setTimeout(
        ()=>{this.logout()}, exireDuration*1000
      )
    }
}
