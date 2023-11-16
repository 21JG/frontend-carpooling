import {DriverModel} from "./driver.model";

import {StatusModel} from "./status.model";
import {VehicleModel} from "./vehicle.model";

export interface DriverpervehicleModel{
  id?: string;
  vehicle?:VehicleModel;
  status?:StatusModel;
}
