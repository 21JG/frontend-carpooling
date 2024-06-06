import {Injectable} from "@angular/core";
import {HttpClient,  HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {VehicleModel} from "../../models/vehicle.model";
import {getCookie} from "../../token/utils/cooke.utils";

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
    this.cadena = 'api/v1/carpooling-uco/vehicle';
    return this.http.post<VehicleModel>(this.cadena, vehicleForm);
  }

  deleteCar(vehicleId: number): Observable<any> {
    const token = getCookie('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`api/v1/carpooling-uco/vehicle/${vehicleId}`);
  }

  getCarsPerDriver(){
    this.cadena = 'api/v1/carpooling-uco/vehicle';
    return this.http.get<VehicleModel>(this.cadena);
  }
}
