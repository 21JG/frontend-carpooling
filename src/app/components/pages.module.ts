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
import { VehicleRegistrationComponent } from "./vehicle-register/vehicle-register.component";
import {RouteCreationComponent} from "./route-creation/routecreation.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {AppRoutingModule} from "../app-routing.module";



const Pages=[
  RouteDetailComponent,
  LoginComponent,
  DriverSignUpComponent,
  RoutesComponent,
  IntroComponent,
  OptionComponent,
  PassengerSignUpComponent,
  VehicleRegistrationComponent,
  RouteCreationComponent,
]

@NgModule({
  declarations:[Pages],
  imports: [
    SharedModule,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    AppRoutingModule,
  ],
  exports:[Pages],
})

export class PagesModule {}

