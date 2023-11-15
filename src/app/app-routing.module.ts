import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DriverSignUpComponent, } from "./components/driver-sign-up/driver-sign-up.component";
import {RoutesComponent} from "./components/routes/routes.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {IntroComponent} from "./components/intro/intro.component";
import {OptionComponent} from "./components/option/option.component";
import {PassengerSignUpComponent} from "./components/passenger-sign-up/passenger-sign-up.component";
import {userGuard} from "./token/guard/user-guard.guard";

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,

    children:[
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
      },
      {
        path:'login',
        component:LoginComponent,
      },
      {
        path:'signup/driver',
        component:DriverSignUpComponent,
      },
      {
        path:'signup/passenger',
        component:PassengerSignUpComponent,
      },
      {
        path:'routes',
        component:RoutesComponent,
        canActivate: [userGuard],
      },
      {
        path:'intro',
        component:IntroComponent,
      },
      {
        path:'signup',
        component:OptionComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
