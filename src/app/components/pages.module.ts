import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {NgApexchartsModule} from "ng-apexcharts";
import {SignUpComponent} from "./sign-up/sign-up.component";


const Pages=[
  LoginComponent,
  SignUpComponent,

]

@NgModule({
  declarations:[Pages,],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,

  ],
  exports:[Pages]
})

export class PagesModule {}

