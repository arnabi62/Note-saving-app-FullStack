import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient,private router:Router) { }
  createUser(user:User)
  {
   return this.httpClient.post<{message:string , user: User} | {error:any}>("http://localhost:3000/user/signup", user)
    }
}
