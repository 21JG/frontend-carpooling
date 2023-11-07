import {DriverModel} from "./driver.model";

export interface VehicleModel{
  id: string;
  plate: string ;
  capacity: number;
  owner: DriverModel ;
}
