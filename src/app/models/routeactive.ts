import {DriverPerVehicleModel} from "./driverpervehicle";
import {PositionModel} from "./position.model";

export interface RouteActiveModel{
  id?: string;
  driverVehicle?: DriverPerVehicleModel ;
  routeCapacity?: number;
  origin?: PositionModel ;
  destination?: PositionModel ;
  color: string; // Add this property

}
