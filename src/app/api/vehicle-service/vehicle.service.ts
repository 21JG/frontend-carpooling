import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {VehicleModel} from "../../models/vehicle.model";

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
    owner: {
      id: 'string',
      licenseNumber: 'string',
      customer: {
        id: 'string',
        dni: 'string',
        firstName: 'string',
        secondName: 'string',
        firstSurname: 'string',
        secondSurname: 'string',
        password: 'string',
        phone: 'string',
        companyEmail: 'string',
      },
      authorizedCategory: {
        id: 'string',
        category: 'string',
      }
    },
  });

  createVehicle(vehicleForm:VehicleModel){
    this.cadena = 'api/v1/carpooling-uco/vehicle' + localStorage.getItem('driver') + '/create';
    return this.http.post<any>(this.cadena, vehicleForm);
  }

  deleteCar(vehicleId: number): Observable<any> {
    return this.http.delete(`api/v1/carpooling-uco/vehicle/${vehicleId}`);
  }

  getCarsPerDriver(){
    this.cadena = 'api/v1/carpooling-uco/vehicle' + localStorage.getItem('driver') + '/findall';
    return this.http.get<VehicleModel>(this.cadena);
  }



}
