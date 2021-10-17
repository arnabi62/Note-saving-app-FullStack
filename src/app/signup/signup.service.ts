import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient) { }
  createUser(user:User)
  {
    this.httpClient.post<{message:string , user: User} | {error:any}>("http://localhost:3000/user/signup", user).subscribe(
      res=>{

        {
            console.log(res);
        }

      })
    }
}
