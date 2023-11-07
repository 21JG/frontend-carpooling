import {CustomerModel} from "./customer.model";

export interface DriverModel {
  id?:string
  licenseNumber?:number
  authorizedCategory?: {
    id?: string;
    category?: string;
    expiration: Date;
  };
  customer:CustomerModel
}
