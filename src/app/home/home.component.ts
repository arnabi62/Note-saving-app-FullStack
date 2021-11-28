import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userId!:string;
isAuthenticated=false;
authsub!:Subscription;
name:string=''
  constructor(private authService:LoginService) { }

  ngOnInit(): void {
    this.userId = this.authService.getid();
    this.isAuthenticated = this.authService.getAuth();
    this.name = this.authService.getname();
    this.authsub = this.authService.getListention().subscribe(
      val=>
      {
         this.userId = this.authService.getid();
        this.isAuthenticated=val;
        this.name = this.authService.getname();
      }
    )
    // if(this.isAuthenticated)
    // {
    //   alert("Welcome Back "+this.name)
    // }
  }

}
