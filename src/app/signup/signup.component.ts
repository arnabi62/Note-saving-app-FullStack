import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService:SignupService) { }

  ngOnInit(): void {
  }
  signup(form:NgForm)
  {

   if(form.invalid){
    return;}
    let user:User ={name:form.value.n, email:form.value.email, password:form.value.pass};


  this.signupService.createUser(user)
  }

}
