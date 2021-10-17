import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private listenersubs!: Subscription;
  isAuthenticated = false;
  constructor(private service:LoginService) { }
  ngOnDestroy(): void {
    this.listenersubs.unsubscribe();
  }

  onlogout()
  {
    this.service.logout();
  }
  ngOnInit(): void {
    this.isAuthenticated=this.service.getAuth()
    this.listenersubs = this.service.getListention().subscribe(val =>
      {
        this.isAuthenticated = val;
      })
  }

}
