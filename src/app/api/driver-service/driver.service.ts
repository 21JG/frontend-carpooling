import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {DriverModel} from "../../models/driver.model";


@Injectable({
  providedIn: 'root'
})

export class driverService{


  constructor(private http: HttpClient) {}
  private cadena = '';

  driver:BehaviorSubject<DriverModel> = new BehaviorSubject<DriverModel>(
    {
      id: 'string',
      customer: {
        id: 'string',
        dni: 'string',
        firstName: 'string',
        secondName: 'string',
        firstSurname: 'string',
        secondSurname: 'string',
        password: 'string',
        phone: 0,
        email: 'string',
        rol:0,
      },
      licenseNumber: 0,
      authorizedCategory: {
        id: 'string',
        category: 'string',
        expiration: new Date(),
      }
    }
  );

  createDriver(driverForm:DriverModel){
    return this.http.post<any>('api/v1/carpooling/driver/create',driverForm);
  }

  getDriver(){
    return this.http.get<DriverModel>('api/v1/carpooling/driver/get')
  }





}
