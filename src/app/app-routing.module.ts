import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostcreateComponent } from './postcreate/postcreate.component';
import { PostlistComponent } from './postlist/postlist.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', component:PostlistComponent},
  {path:'create', component:PostcreateComponent},
  {path:'edit/:postId', component:PostcreateComponent},
  {path: 'login', component: LoginComponent},
  {path:'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
