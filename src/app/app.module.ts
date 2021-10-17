import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import { NotesComponent } from './notes/notes.component';
import { PostcreateComponent } from './postcreate/postcreate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PostlistComponent } from './postlist/postlist.component';
import { MatExpansionModule} from '@angular/material/expansion'
import { PostService } from './post.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from './search.pipe';
import {MatIconModule} from '@angular/material/icon';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthInceptor } from './signup/auth_interceptor';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,

    NotesComponent,
    PostcreateComponent,
    HeaderComponent,
    PostlistComponent,
    FooterComponent,
    SearchPipe,
    SignupComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    Ng2SearchPipeModule
  ],
  providers: [PostService, DatePipe, {provide: HTTP_INTERCEPTORS, useClass:AuthInceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
