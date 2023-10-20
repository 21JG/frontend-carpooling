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
import {AgmCoreModule} from "@agm/core";
import {RoutesComponent} from "./routes/routes.component";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";


const Pages=[
  LoginComponent,
  SignUpComponent,
  RoutesComponent,

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
    MatCardModule,
    MatTableModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAW_y-F8u-3-pOIwQQmygMAGlK8386tEYo'
    }),
    Ng2SearchPipeModule,
    MatChipsModule,
    MatLegacyChipsModule

  ],
  exports:[Pages]
})

export class PagesModule {}

