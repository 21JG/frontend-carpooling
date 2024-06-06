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
import {RouteDetailComponent} from "./components/route-detail/routedetail.component";
import { VehicleRegistrationComponent } from './components/vehicle-register/vehicle-register.component';

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
        path:'signup/driver/vehicle',
        component:VehicleRegistrationComponent,
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
      },
      {
        path:'routedetail/:id',
        // loadChildren:()=>import("src/app/components/pages.module").then(m=>m.PagesModule),
        component:RouteDetailComponent,
        canActivate: [userGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
