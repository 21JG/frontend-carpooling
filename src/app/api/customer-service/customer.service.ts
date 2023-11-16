import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CustomerModel} from "../../models/customer.model";
import {DOMAIN_URL} from "../../../environments/domain.prod";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class CustomerService {


  constructor(private http: HttpClient,private router: Router) {}
  private cadena = '';

  customer:BehaviorSubject<CustomerModel> = new BehaviorSubject<CustomerModel>(
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
      rol:0,
    }
  );

  createCustomer(customerForm:CustomerModel):Observable<any>{
    // return this.http.post<any>(`${DOMAIN_URL}/api/v1/carpooling/customer`,customerForm);
    return this.http.post<any>(`/api/v1/carpooling/customer`,customerForm);
  }

  getCustomer(){
    return this.http.get<CustomerModel>(`${DOMAIN_URL}/api/v1/carpooling/customer/get`)
  }





}
