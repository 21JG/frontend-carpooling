import { Component, OnInit} from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import { ToastrService} from "ngx-toastr";
import { driverService} from "../../api/driver-service/driver.service";
import { DriverStateLoginService} from "../../api/driver-service/driverStateLogin.service";
import { LoginService } from "../../api/login-service/login.service";
import { DriverModel} from "../../models/driver.model";
import { AuthorizedCategoryModel} from "../../models/authorizedcategory.model";

import {deleteCookie, setCookie} from "../../token/utils/cooke.utils";



@Component({
  selector: 'app-driver-sign-up',
  templateUrl: './driver-sign-up.component.html',
  styleUrls: ['./driver-sign-up.component.css']
})

export class DriverSignUpComponent implements OnInit{

  public DriverForm !: FormGroup
  hidePassword: boolean;
  public categorias: AuthorizedCategoryModel[] = [];


  constructor(
    private formBuilder: FormBuilder,  private router: Router, private driverService:driverService,
    private driverStateLoginService:DriverStateLoginService, private tokenService: LoginService, private toast:ToastrService
  ){}

  ngOnInit(): void {
    this.Form();


    this.driverService.getAuthorizedCategory().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );

  }

  Form() {
    this.DriverForm = this.formBuilder.group({
      dni: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      firstSurname: ['', Validators.required],
      secondSurname: ['', Validators.required],
      password: ['', Validators.required],
      licenseNumber: ['', [Validators.required]],
      category: ['',[Validators.required]],
      // expiration: ['', [Validators.required]],
      phone: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],

    });
  }


  signUpDriver(){
    let driverDTO:DriverModel = {
      customer:{
        companyEmail:this.DriverForm.get('companyEmail').value,
        password: this.DriverForm.get("password").value,
        dni: this.DriverForm.get("dni").value,
        firstName: this.DriverForm.get("firstName").value,
        phone: this.DriverForm.get("phone").value,
        firstSurname: this.DriverForm.get("firstSurname").value,
        secondName: this.DriverForm.get("secondName").value,
        secondSurname: this.DriverForm.get("secondSurname").value,
      },
      licenseNumber: this.DriverForm.get("licenseNumber").value,
      authorizedCategory:this.categorias.filter(categoria=> categoria.id == this.DriverForm.get("category").value)[0]
    }
    this.driverService.createDriver(driverDTO).subscribe({
      next:(driver: DriverModel) => {
        this.toast.success("Signed Up successfully")
        this.driverStateLoginService.setDriver(driverDTO);
        //this.autoLogin(driverDTO.customer.companyEmail, driverDTO.customer.password);
        this.router.navigate(['signup/driver/vehicle']);
      },
      error:(error) => {
        console.log("Error")
        this.toast.error("Something went wrong")
        console.log(this.DriverForm)
      }
    })
  }

 /* autoLogin(email: string, password: string) {
    const logInForm = { username: email, password: password };

    this.tokenService.logIn(logInForm).subscribe({
      next: (response: any) => {
        if (response.data && response.data.length > 0 && response.data[0].token) {
          const token = response.data[0].token;
          console.log('Token found:', token);
          setCookie('token', token, { expires: 8 });
          this.router.navigate(['signup/driver/vehicle']);
        } else {
          console.error('Token not found in the response. Response:', response);
        }
      },
      error: (error) => {
        console.error('Error during auto-login:', error);
        this.toast.error("Error during auto-login");
      }
    });
 }*/
}
