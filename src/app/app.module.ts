import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,

    NotesComponent,
    PostcreateComponent,
    HeaderComponent,
    PostlistComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  providers: [PostService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }