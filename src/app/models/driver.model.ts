import {CustomerModel} from "./customer.model";
import {AuthorizedCategoryModel} from "./authorizedcategory.model";

export interface DriverModel {
  id?:string
  licenseNumber?:string
  authorizedCategory?: AuthorizedCategoryModel
  customer:CustomerModel
}
