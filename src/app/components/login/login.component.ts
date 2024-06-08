import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from "../../api/login-service/login.service";
import {encrypt, setCookie} from "../../token/utils/cooke.utils";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  public logInForm !: FormGroup;
  state: string = 'none';
  hidePassword = true;
  public showMessage = false;
  public mensaje: string = 'Ha ocurrido un error inesperado.';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService:LoginService,
    private toast:ToastrService) {}

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

          const companyEmail = this.logInForm.get('companyEmail')?.value;
          const encryptedEmail = encrypt(companyEmail);
          setCookie('1P_JAR2', encryptedEmail, { expires: 8 });

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
