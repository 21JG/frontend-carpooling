import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {driverModel} from "../../models/driver.model";
import {BehaviorSubject, Observable} from "rxjs";
import {VehicleModel} from "../../models/vehicle.model";
import {userModel} from "../../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  constructor(private http: HttpClient) {}
  private cadena = '';

  vehicle:BehaviorSubject<VehicleModel>=new BehaviorSubject<VehicleModel>({
    id: 'string',
    plate: 'string',
    capacity: 0,
    owner: {},
  });

  createVehicle(vehicleForm:VehicleModel){
    this.cadena = 'api/v1/carpooling/vehicle' + localStorage.getItem('driver') + '/create';
    return this.http.post<any>(this.cadena, vehicleForm);
  }
  deleteCar(vehicleId: number): Observable<any> {
    return this.http.delete(`api/v1/carpooling/vehicle/delete/${vehicleId}`);
  }

  getAllCars(vehicleForm:VehicleModel){
    return this.http.post<VehicleModel>('api/v1/carpooling/customer/vehicle/findall',vehicleForm);
  }

  getCarsPerDriver(){
    this.cadena = 'api/v1/carpooling/vehicle' + localStorage.getItem('driver') + '/findall';
    return this.http.get<VehicleModel>(this.cadena);
  }



}
