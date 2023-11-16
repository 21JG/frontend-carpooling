import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { CustomerModel } from '../../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from "../../api/login-service/login.service";
import {deleteCookie, setCookie} from "../../token/utils/cooke.utils";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public logInForm !: FormGroup
  state: string = 'none';
  hidePassword = true;
  public showMessage = false;
  public mensaje: string = '';




  constructor(private formBuilder: FormBuilder,  private router: Router, private tokenService:LoginService, private toast:ToastrService) {

  }
  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      companyEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    this.tokenService.logout();
  }

  logIn(){
    this.tokenService.logIn(this.logInForm.value).subscribe({
      next: (response: any) => {
        if (response.data && response.data.length > 0 && response.data[0].token) {
          const token = response.data[0].token;
          console.log('Token found:', token);
          setCookie('token', token, { expires: 8 });
          this.router.navigate(['/routes']);
        } else {
          console.error('Token not found in the response. Response:', response);
        }
      },
      error: (error) => {
        this.showMessage = true;
        this.mensaje = error.error.messages[0].content;
        this.toast.error("Invalid Credentials")
      }
    })
  }



}
