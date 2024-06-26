import {Injectable} from "@angular/core";
import {CustomerModel} from "../../models/customer.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {signUpForm,logInForm} from '../../models/security.model';
import {DOMAIN_URL} from "../../../environments/domain.prod";


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  customerProfile: BehaviorSubject<CustomerModel> = new BehaviorSubject<CustomerModel>({
    companyEmail: '',
    password: '',

  });

  signUp(signUpForm:signUpForm):Observable<any>{
    return this.http.post<any>(`${DOMAIN_URL}/register`, signUpForm);
  }

  logIn(logInForm:logInForm):Observable<any>{
    return this.http.post<any>(`${DOMAIN_URL}/api/v1/carpooling-uco/auth/signin`, logInForm);
  }

  saveUserToLocal(customer: CustomerModel){
    this.customerProfile.next(customer);
    localStorage.setItem('password', JSON.stringify(customer.password)?.replace(/['"]+/g, ''));
    localStorage.setItem('companyEmail', JSON.stringify(customer.companyEmail)?.replace(/['"]+/g, ''));
  }

  public verifyLogged():boolean{
    const token = localStorage.getItem('token');
    return !!token;
  }

  public logout():void {
    localStorage.removeItem('companyEmail');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
