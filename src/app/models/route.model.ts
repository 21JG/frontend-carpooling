import {PointOfInterestModel} from "./pointofinterest.model";
import {PositionModel} from "./position.model";
import {StatusModel} from "./status.model";
import {DriverPerVehicleModel} from "./driverpervehicle";

export interface RouteModel{
  id?: string;
  driverVehicle?: DriverPerVehicleModel ;
  routeCapacity: number;
  pointsOfInterest: PointOfInterestModel[];
  position?:PositionModel[];
  routeTime?: Date;
  routeStatus?:StatusModel;
}



