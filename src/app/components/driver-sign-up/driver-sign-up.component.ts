import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {driverService} from "../../api/driver-service/driver.service";
import {DriverModel} from "../../models/driver.model";
import {CustomerModel} from "../../models/customer.model";



@Component({
  selector: 'app-driver-sign-up',
  templateUrl: './driver-sign-up.component.html',
  styleUrls: ['./driver-sign-up.component.css']
})

export class DriverSignUpComponent implements OnInit{

  public DriverForm !: FormGroup
  hidePassword: boolean;
  public categorias: string[] = [];


  constructor(private formBuilder: FormBuilder,  private router: Router, private driverService:driverService, private toast:ToastrService){}

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
      category: ['', [Validators.required]],
      // expiration: ['', [Validators.required]],
      phone: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],

    });
  }
  // signUp(){
  //   this.customerService.createCustomer(this.CustomerForm.value)
  //     .subscribe(res=>{
  //       this.toast.success("Signed Up successfully")
  //       this.router.navigate(['/login'])
  //     },err=>{
  //       console.error(err);
  //       this.toast.error("Something went wrong")
  //     })
  // }


  signUpDriver(){
    let driverDTO:DriverModel = {
      customer:{
        companyEmail:this.DriverForm.get('companyEmail').value,
        password: this.DriverForm.get("password").value,
        dni: this.DriverForm.get("dni").value,
        firstName: this.DriverForm.get("firstName").value,
        phone: parseInt(this.DriverForm.get("phone").value),
        firstSurname: this.DriverForm.get("firstSurname").value,
        secondName: this.DriverForm.get("secondName").value,
        secondSurname: this.DriverForm.get("secondSurname").value,
      },
      licenseNumber: this.DriverForm.get("licenseNumber").value,
      authorizedCategory:{
        category: this.DriverForm.get("category").value,
        // expiration: this.DriverForm.get("expiration").value,
      },
    }
    this.driverService.createDriver(driverDTO).subscribe({
      next:(driver: DriverModel) => {
        this.toast.success("Signed Up successfully")
        this.router.navigate(['/login'])
      },
      error:(error) => {
        this.toast.error("Something went wrong")
        console.log(this.DriverForm)
      }
    })
  }


  // signUpDriver() {
  //   this.driverService.createDriver(this.DriverForm.value).subscribe(
  //     (response) => {
  //       this.toast.success("Signed Up successfully");
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       this.toast.error("Something went wrong");
  //       console.log(this.DriverForm);
  //     }
  //   );
  // }

}

