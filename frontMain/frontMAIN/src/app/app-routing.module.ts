import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';
import {ProfileComponent} from './profile/profile.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path:'account', component: AccountComponent},
  {path:'profile', component:ProfileComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
