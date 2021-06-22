import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { RequestComponent } from './request/request.component';
import { StatusComponent } from './status/status.component';

const routes: Route[] = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'request', component: RequestComponent},
  {path: 'status', component: StatusComponent},
  {path: 'angel', component: MainComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
