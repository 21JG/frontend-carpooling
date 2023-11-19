import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DriverModel} from "../../models/driver.model";
import {DOMAIN_URL} from "../../../environments/domain.prod";
import {AuthorizedCategoryModel} from "../../models/authorizedcategory.model";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class driverService{


  constructor(private http: HttpClient) {}
  private cadena = '';

  driver:BehaviorSubject<DriverModel> = new BehaviorSubject<DriverModel>(
    {
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
        phone: 0,
        companyEmail: 'string',
        rol:0,
      },
    }
  );

  createDriver(driverForm:DriverModel):Observable<any>{
    // return this.http.post<any>(`${DOMAIN_URL}/api/v1/carpooling/driver`,driverForm);
    return this.http.post<any>(`/api/v1/carpooling/driver`,driverForm);

  }

  getDriver(){
    return this.http.get<DriverModel>(`${DOMAIN_URL}/api/v1/carpooling/driver`)
  }
  getAuthorizedCategory():Observable<AuthorizedCategoryModel[]>{
    return this.http.get<any>(`${DOMAIN_URL}/api/v1/carpooling/authorizedcategory`).pipe(
      map(response => response.data[0].map(categoryObj => categoryObj))
    )
  }

}
