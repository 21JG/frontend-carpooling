import {DriverPerVehicleModel} from "./driverpervehicle";

export interface RouteActiveModel{
  id?: string;
  driverVehicle?: DriverPerVehicleModel ;
  routeCapacity?: number;

}
