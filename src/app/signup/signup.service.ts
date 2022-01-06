import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient,private router:Router) { }
  createUser(user:User)
  {
   return this.httpClient.post<{message:string , user: User} | {error:any}>(environment.apiUrl+"user/signup", user)
    }
}
