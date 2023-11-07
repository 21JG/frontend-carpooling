import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {CustomerModel} from "../../models/customer.model";
import {DOMAIN_URL} from "../../../environments/domain.prod";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http: HttpClient) {}
  private cadena = '';

  driver:BehaviorSubject<CustomerModel> = new BehaviorSubject<CustomerModel>(
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
    }
  );

  createCustomer(customerForm:CustomerModel){
    return this.http.post<any>(`${DOMAIN_URL}/api/v1/carpooling/customer`,customerForm);
  }

  getCustomer(){
    return this.http.get<CustomerModel>(`${DOMAIN_URL}/api/v1/carpooling/customer/get`)
  }





}
