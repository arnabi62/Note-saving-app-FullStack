import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostcreateComponent } from './postcreate/postcreate.component';
import { PostlistComponent } from './postlist/postlist.component';
import { Authguard } from './signup/auth_guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'notes', component:PostlistComponent},
  {path:'create', component:PostcreateComponent, canActivate:[Authguard]},
  {path:'edit/:postId', component:PostcreateComponent, canActivate:[Authguard]},
  // {path: 'login', component: LoginComponent},
  // {path:'signup', component: SignupComponent},
  {path:'', component:HomeComponent},
  {path: "auth", loadChildren: () => import('./signup/auth_routing.module').then(m => m.AuthRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[Authguard]
})
export class AppRoutingModule { }
