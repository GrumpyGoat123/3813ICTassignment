import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';

//Services
import { SocketService } from './services/socket.service';
// import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

//app components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
// import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule // for http method
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
