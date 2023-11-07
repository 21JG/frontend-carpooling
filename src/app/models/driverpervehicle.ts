import {StatusModel} from "./status.model";
import {VehicleModel} from "./vehicle.model";
import {DriverModel} from "./driver.model";

export interface DriverPerVehicleModel {
  id?:string
  driver?:DriverModel
  vehicle?:VehicleModel
  status?:StatusModel;
}
