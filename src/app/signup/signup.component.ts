import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { SignupService } from './signup.service';
import {LoginService} from '../login/login.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

private authStatusSub!: Subscription;
isfalse:boolean=false;
  constructor(private signupService:SignupService, private router:Router) { }

  ngOnInit(): void {
   
  }

  ngOnDestroy():void
  {

  }
  signup(form:NgForm)
  {

   if(form.invalid){
    return;}
    let user:User ={name:form.value.n, email:form.value.email, password:form.value.pass};


  this.signupService.createUser(user).subscribe(
     res=>{

        //   console.log(res);
            this.router.navigate(['/'])
      },
      error =>
      {
        //console.log("error");
        form.reset();
        this.isfalse = true;
      }
      
     
  )
  }

}
