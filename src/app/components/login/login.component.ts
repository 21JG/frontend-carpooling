import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { userModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from "../../api/login-service/login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public logInForm !: FormGroup
  state: string = 'none';
  hidePassword = true;


  constructor(private formBuilder: FormBuilder,  private router: Router, private tokenService:LoginService, private toast:ToastrService) {

  }
  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    this.tokenService.logout();
  }

  logIn(){
    this.tokenService.logIn(this.logInForm.value).subscribe({
      next: (user: userModel) => {
        // user.email = this.logInForm.get(['username'])?.value;
        // this.tokenService.saveUserToLocal(user);


        //ruta para la que debe navegar si esta validado
        this.router.navigate(['/ruta de lo que siga ']);
      },
      error: (error) => {
        this.toast.error("Invalid Credentials")
      }
    })
  }

}
