import {userModel} from "./user.model";

export interface RouterequestModel {
  id?: string;
  serviceRequestTime?: string;
  serviceRequestDate?: string;
  customer?: userModel;
  status?: string;
  routeRequestOrigin?: string;
  routeRequestEnd?: string;
}
