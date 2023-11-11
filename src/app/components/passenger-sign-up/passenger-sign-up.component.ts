import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CustomerService} from "../../api/customer-service/customer.service";
import {CustomerModel} from "../../models/customer.model";


@Component({
  selector: 'app-driver-sign-up',
  templateUrl: './passenger-sign-up.component.html',
  styleUrls: ['./passenger-sign-up.component.css']
})

export class PassengerSignUpComponent implements OnInit{

  public CustomerForm !: FormGroup
  hidePassword: boolean;
  constructor(private formBuilder: FormBuilder,  private router: Router, private customerService:CustomerService, private toast:ToastrService){}

  ngOnInit():void{
    this.CustomerForm = this.formBuilder.group({
      dni:['',Validators.required],
      firstName:['',Validators.required],
      secondName:[''],
      firstSurname:['',Validators.required],
      secondSurname:['',Validators.required],
      password:['',Validators.required],
      phone:['',Validators.required],
      companyEmail:['', [Validators.required, Validators.email]],
    })

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


  signUpPassenger(){
    this.customerService.createCustomer(this.CustomerForm.value).subscribe({
      next:(customer: CustomerModel) => {
        customer.companyEmail = this.CustomerForm.get(['companyEmail'])?.value;
        this.toast.success("Signed Up successfully")
        this.router.navigate(['/login'])
      },
      error:(error) => {
        this.toast.error("Something went wrong")
        console.log(this.CustomerForm)
      }
    })
  }

  // signUpPassenger() {
  //   this.customerService.createCustomer(this.CustomerForm.value).subscribe(
  //     (response) => {
  //       this.toast.success("Signed Up successfully");
  //       this.router.navigate(['/login']);
  //     }, (error) => {
  //       this.toast.error("Something went wrong");
  //
  //       console.log(this.CustomerForm);
  //     }
  //   );
  // }

}

