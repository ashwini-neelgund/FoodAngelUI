import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AngelComponent } from './angel/angel.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { RequestComponent } from './request/request.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { StatusComponent } from './status/status.component';

const routes: Route[] = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService]},
  {path: 'request', component: RequestComponent},
  {path: 'status', component: StatusComponent},
  {path: 'angel', component: AngelComponent,canActivate:[AuthGaurdService]},
  {path: 'aboutus', component: AboutusComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
