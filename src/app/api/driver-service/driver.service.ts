import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {driverModel} from "../../models/driver.model";


@Injectable({
  providedIn: 'root'
})

export class driverService{


  constructor(private http: HttpClient) {}
  private cadena = '';

  driver:BehaviorSubject<driverModel> = new BehaviorSubject<driverModel>(
    {
      id: 'string',
      dni: 'string',
      firstName: 'string',
      secondName: 'string',
      firstSurname: 'string',
      secondSurname: 'string',
      password: 'string',
      phone: 0,
      companyEmail: 'string',
      licenseNumber: 'string',
      authorizedCategory: {
        id: 'string',
        category: 'string',
        validity: 'string',
      }
    }
  );

  createDriver(driverForm:driverModel){
    return this.http.post<any>('api/v1/carpooling/driver/create',driverForm);
  }

  getDriver(){
    return this.http.get<driverModel>('api/v1/carpooling/driver/get')
  }





}
