import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {RoutesComponent} from "./components/routes/routes.component";
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,

    children:[
      {
        path: '',
        redirectTo: 'routes',
        pathMatch: 'full'
      },
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
