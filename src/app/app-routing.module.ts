import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,

    children:[
      {
        path:'login',
        component:LoginComponent,
      },
      {
        path:'signup',
        component:SignUpComponent,
      }
      // {
      //   //ruta de Rutas y creacion de rutas
      //   path:'routes',
      //   component:,
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
