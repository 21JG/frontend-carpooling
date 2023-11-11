import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DriverModel} from "../../models/driver.model";
import {DOMAIN_URL} from "../../../environments/domain.prod";


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
        companyEmail: 'string',
      },
      licenseNumber: 0,
      authorizedCategory: {
        id: 'string',
        category: 'string',
        expiration: new Date(),
      }
    }
  );

  createDriver(driverForm:DriverModel):Observable<any>{
    // return this.http.post<any>(`${DOMAIN_URL}/api/v1/carpooling/driver`,driverForm);
    return this.http.post<any>(`/api/v1/carpooling/driver`,driverForm);

  }

  getDriver(){
    return this.http.get<DriverModel>(`${DOMAIN_URL}/api/v1/carpooling/driver`)
  }





}
