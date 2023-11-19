import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {VehicleModel} from "../../models/vehicle.model";
import {RouteModel} from "../../models/route.model";
import {RouteActiveModel} from "../../models/routeactive";
import {DriverModel} from "../../models/driver.model";
import {DOMAIN_URL} from "../../../environments/domain.prod";
import {getCookie} from "../../token/utils/cooke.utils";


@Injectable({
  providedIn:"root",
})
export class RoutesService {

  constructor(private http: HttpClient) {
  }

  RouteActive: BehaviorSubject<RouteActiveModel> = new BehaviorSubject<RouteActiveModel>({
    id: 'string',
    driverVehicle: {
      id: 'string',
      vehicle: {
        id: 'string',
        plate: 'string',
        capacity: 0,
        owner: {
          id: 'string',
          licenseNumber: 'string',
          authorizedCategory: {
            id: 'string',
            category: 'string',
          },
          customer: {
            id: 'string',
            dni: 'string',
            firstName: 'string',
            secondName: 'string',
            firstSurname: 'string',
            secondSurname: 'string',
            password: 'string',
            companyEmail: 'string',
            phone: 0,
          },
        },
      },
      status: {
        id: 'string',
        status: 'string',
      },
    },
    routeCapacity:0,
    origin:{
      latitude:'string',
      longitude:'string',
    },
    destination:{
      latitude:'string',
      longitude:'string',
    },
  });

  Route: BehaviorSubject<RouteModel> = new BehaviorSubject<RouteModel>({
    id: 'string',
    driverVehicle: {
      id: 'string',
      vehicle: {
        id: 'string',
        plate: 'string',
        capacity: 0,
        owner: {
          id: 'string',
          licenseNumber: 'string',
          authorizedCategory: {
            id: 'string',
            category: 'string',
          },
          customer: {
            id: 'string',
            dni: 'string',
            firstName: 'string',
            secondName: 'string',
            firstSurname: 'string',
            secondSurname: 'string',
            password: 'string',
            companyEmail: 'string',
            phone: 0,
          },
        },
      },
      status: {
        id: 'string',
        status: 'string',
      },
    },
    routeCapacity:0,
    pointsOfInterest:[],
    position:[],
    routeTime:'string',
    routeStatus: {
      id: 'string',
      status: 'string',
    },
  });


  getActiveRoutes(): Observable<RouteActiveModel[][]> {
    const token = getCookie('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    // return this.http.get<RouteActiveModel[]>(`${DOMAIN_URL}/api/v1/carpooling/route-detail/active`,{headers});
    return this.http.get<RouteActiveModel[][]>(`/api/v1/carpooling/route/active`,{headers});
  }
  getRouteDetail(routeId:string): Observable<RouteModel[][]> {
    const token = getCookie('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const ruta = `/api/v1/carpooling/route/${routeId}`;
    // return this.http.get<RouteActiveModel[]>(`${DOMAIN_URL}/api/v1/carpooling/route-detail/active`,{headers});
    return this.http.get<RouteModel[][]>(ruta,{headers});
  }

}



