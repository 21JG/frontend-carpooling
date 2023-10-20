import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {RoutesComponent} from "./components/routes/routes.component";

const routes: Routes = [
  {
    path:'',
    component:RoutesComponent,

    children:[
      {
        path:'login',
        component:LoginComponent,
      },
      {
        path:'signup',
        component:SignUpComponent,
      },
      {
        path:'routes',
        component:RoutesComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
