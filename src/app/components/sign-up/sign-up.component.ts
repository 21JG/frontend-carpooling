import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../api/login-service/login.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit{

  public signUpForm !: FormGroup
  hidePassword: boolean;
  constructor(private formBuilder: FormBuilder,  private router: Router, private tokenService:LoginService, private toast:ToastrService){}

  ngOnInit():void{
    this.signUpForm = this.formBuilder.group({
      dni:['',Validators.required],
      firstName:['',Validators.required],
      secondName:['',Validators.required],
      firstSurname:['',Validators.required],
      secondSurname:['',Validators.required],
      password:['',Validators.required],
      phone:['',Validators.required],
      companyEmail:['',[Validators.required,Validators.email]],
    })
  }
  signUp(){
    this.tokenService.signUp(this.signUpForm.value)
      .subscribe(res=>{
        this.toast.success("Signed Up successfully")
        this.router.navigate(['/login'])
      },err=>{
        console.error(err);
        this.toast.error("Something went wrong")
      })
  }
}

