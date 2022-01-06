import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authguard } from './auth_guard';
import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component';
const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[Authguard]
})
export class AuthRoutingModule { }
