import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AngelHomeComponent } from './angel-home/angel-home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BasicAuthHttpInterceptorService } from './services/basic-auth-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    RegisterComponent,
    AngelHomeComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GooglePlaceModule
  ],
  providers: [{  
    provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
