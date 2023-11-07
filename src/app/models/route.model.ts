import {DriverModel} from "./driver.model";
import {PointOfInterestModel} from "./pointofinterest.model";
import {PositionModel} from "./position.model";
import {StatusModel} from "./status.model";

export interface RouteModel{
  id: string;
  owner: DriverModel ;
  capacity: number;
  pointsOfInterest: PointOfInterestModel[];
  position:PositionModel[];
  routeTime: Date;
  routeStatus:StatusModel;
}



