import {Injectable} from "@angular/core";
import {userModel} from "../../models/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {signUpForm,logInForm} from '../../models/security.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}
  userProfile: BehaviorSubject<userModel> = new BehaviorSubject<userModel>({
    companyEmail: '',
    token: '',
  });

  signUp(signUpForm:signUpForm):Observable<any>{
    return this.http.post<any>('http://localhost:8080/register', signUpForm);
  }

  logIn(logInForm:logInForm):Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/v1/carpooling/auth', logInForm);
  }

  saveUserToLocal(user: userModel){
    this.userProfile.next(user);
    localStorage.setItem('token', JSON.stringify(user.token)?.replace(/['"]+/g, ''));
    localStorage.setItem('user', JSON.stringify(user.companyEmail)?.replace(/['"]+/g, ''));
  }

  public verifyLogged():boolean{
    const token = localStorage.getItem('token');
    return !!token;
  }

  public logout():void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
