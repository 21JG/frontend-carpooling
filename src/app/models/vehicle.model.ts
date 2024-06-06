import {DriverModel} from "./driver.model";

export interface VehicleModel{
  id?: string;
  name: string;
  plate: string;
  capacity: number;
  owner: DriverModel ;
}
