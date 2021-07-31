import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostcreateComponent } from './postcreate/postcreate.component';
import { PostlistComponent } from './postlist/postlist.component';

const routes: Routes = [
  {path:'', component:PostlistComponent},
  {path:'create', component:PostcreateComponent},
  {path:'edit/:postId', component:PostcreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
