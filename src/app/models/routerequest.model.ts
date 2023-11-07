import {CustomerModel} from "./customer.model";

export interface RouteRequestModel {
  id?: string;
  serviceRequestTime?: string;
  serviceRequestDate?: string;
  customer?: CustomerModel;
  status?: string;
  routeRequestOrigin?: string;
  routeRequestEnd?: string;
}
