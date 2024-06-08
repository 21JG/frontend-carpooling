import {CustomerModel} from "./customer.model";
import {DriverpervehicleModel} from "./driverpervehicle.model";

export interface RouteRequestModel {
  id?: string;
  DriverVehicle?: DriverpervehicleModel;
  routeRequestOriginLatitude?: string;
  routeRequestOriginLongitude?: string;
  routeRequestEndLatitude?: string;
  routeRequestEndLongitude?: string;
  routeCapacity?: number;
}
