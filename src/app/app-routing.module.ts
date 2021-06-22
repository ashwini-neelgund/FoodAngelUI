import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AngelHomeComponent } from './angel-home/angel-home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { AuthGaurdService } from './services/auth-gaurd.service';

const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService]},
  {path: 'register', component: RegisterComponent},
  {path: 'angel', component: AngelHomeComponent,canActivate:[AuthGaurdService]},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
