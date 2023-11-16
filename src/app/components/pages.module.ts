import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {NgApexchartsModule} from "ng-apexcharts";
import {DriverSignUpComponent} from "./driver-sign-up/driver-sign-up.component";
import {AgmCoreModule} from "@agm/core";
import {RoutesComponent} from "./routes/routes.component";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {IntroComponent} from "./intro/intro.component";
import {OptionComponent} from "./option/option.component";
import {PassengerSignUpComponent} from "./passenger-sign-up/passenger-sign-up.component";
import {SharedModule} from "../shared/shared.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {RouteDetailComponent} from "./route-detail/routedetail.component";


const Pages=[
  LoginComponent,
  DriverSignUpComponent,
  RoutesComponent,
  IntroComponent,
  OptionComponent,
  PassengerSignUpComponent,
  RouteDetailComponent,

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
    MatProgressBarModule,
    Ng2SearchPipeModule,
    NgIf,
    MatChipsModule,
    MatLegacyChipsModule,
    SharedModule

  ],
  exports:[Pages],
})

export class PagesModule {}

