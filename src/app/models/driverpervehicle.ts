import {StatusModel} from "./status.model";
import {VehicleModel} from "./vehicle.model";

export interface DriverPerVehicleModel {
  id?:string
  vehicle?:VehicleModel
  status?:StatusModel;
}
