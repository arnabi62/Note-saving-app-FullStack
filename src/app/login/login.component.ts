import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginService } from './login.service';
import { User } from '../signup/user';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginservice:LoginService) { }
  isLoading=false;
  name:string="";
  authsub!:Subscription;
  istrue=true;
  functionCalled=false
  
login(form:NgForm)
{
  if(form.invalid)
    return;

  
   this.loginservice.login(form.value.email, form.value.pass);

  //  this.istrue = this.loginservice.getAuth();
  //  console.log(this.istrue)
   this.functionCalled = true;
  


}
  ngOnInit(): void {
this.authsub = this.loginservice.getListention().subscribe(
  val=>
  {
    this.istrue = this.loginservice.getAuth();
    console.log(this.istrue);
    if(this.istrue)
    {
      console.log(this.istrue);
    }
  }
)
  }

}
