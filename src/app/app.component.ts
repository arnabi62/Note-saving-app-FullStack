import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import {Post} from './postmodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'note';

  constructor(private authService: LoginService){}
  ngOnInit()
  {
    this.authService.autoAuthUser();
  }
}
