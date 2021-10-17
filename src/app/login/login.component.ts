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
login(form:NgForm)
{
  if(form.invalid)
    return;

   this.loginservice.login(form.value.email, form.value.pass);


}
  ngOnInit(): void {

  }

}
