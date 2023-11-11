import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {VehicleModel} from "../../models/vehicle.model";
import {RouteModel} from "../../models/route.model";
import {RouteActiveModel} from "../../models/routeavaible";


@Injectable({
  providedIn:"root",
})
export class RoutesService{

  constructor(private http: HttpClient) {}

  // RouteActive:BehaviorSubject<RouteActiveModel>=new BehaviorSubject<RouteActiveModel>({
  //   id: 'string',
  //   driverVehicle: {
  //     id: 'string',
  //     driver: {
  //       id: 'string',
  //       customer: {
  //         id: 'string',
  //         dni: 'string',
  //         firstName: 'string',
  //         secondName: 'string',
  //         firstSurname: 'string',
  //         secondSurname: 'string',
  //         password: 'string',
  //         phone: 0,
  //         companyEmail: 'string',
  //       },
  //       authorizedCategory: {
  //         id: 'string',
  //         category: 'string',
  //         expiration: new Date(),
  //       },
  //     },
  //   },
  //   routeCapacity: 0,
  // });
  // Route:BehaviorSubject<RouteModel>=new BehaviorSubject<RouteModel>({
  //   id: 'string',
  //   driverVehicle: {
  //     id: 'string',
  //     customer: {
  //       id: 'string',
  //       dni: 'string',
  //       firstName: 'string',
  //       secondName: 'string',
  //       firstSurname: 'string',
  //       secondSurname: 'string',
  //       password: 'string',
  //       companyEmail: 'string',
  //       phone: 0,
  //     },
  //     authorizedCategory: {
  //       id: 'string',
  //       category: 'string',
  //       expiration: new Date(),
  //     },
  //     licenseNumber: 0,
  //   },
  //   routeCapacity: 0,
  //   pointsOfInterest: {
  //     id: 'string',
  //     name: 'string',
  //   },
  //   position: {
  //     latitude: 'string',
  //     longitude: 'string',
  //   },
  //   routeTime: new Date(),
  //   routeStatus: {
  //     id: 'string',
  //     status: 'string',
  //   },
  // };








}
// routeStatus:{
//   id:'string',
//     status:'string',
// },
// vehicle:{},
//
//
//
// routeCapacity:0,
//   pointsOfInterest:{
//   id:'string',
//     name: 'string',
// },
// position:{
//   latitude:'string',
//     longitude:'string',
// },
// routeTime:new Date(),
//   routeStatus:{
//   id:'string',
//     status:'string',
// },

