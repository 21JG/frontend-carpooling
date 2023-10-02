import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {userModel} from "../../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserService{


  constructor(private http: HttpClient) {}
  private cadena = '';

  driver:BehaviorSubject<userModel> = new BehaviorSubject<userModel>(
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
      token: 'string',
    }
  );

  createDriver(userForm:userModel){
    return this.http.post<any>('api/v1/carpooling/customer/create',userForm);
  }

  getDriver(){
    return this.http.get<userModel>('api/v1/carpooling/customer/get')
  }





}
