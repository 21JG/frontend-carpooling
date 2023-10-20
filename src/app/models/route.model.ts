import {driverModel} from "./driver.model";
import {PointOfInterest} from "./pointofinterest.model";

export interface RouteModel{
  id: string;
  owner: driverModel ;
  capacity: number;
  pointsOfInterest: PointOfInterest[];
  position:string;
  routeTime: Date;
}



