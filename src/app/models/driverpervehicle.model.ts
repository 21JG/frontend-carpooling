import {DriverModel} from "./driver.model";

import {StatusModel} from "./status.model";
import {VehicleModel} from "./vehicle.model";

export interface RouteModel{
  id?: string;
  owner?: DriverModel ;
  vehicle?:VehicleModel;
  status?:StatusModel;
}
