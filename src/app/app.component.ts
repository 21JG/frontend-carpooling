import {Component, OnInit} from '@angular/core';
import {CustomerModel} from "./models/customer.model";
import {LoginService} from "./api/login-service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend-carpooling';

  userInfo?:CustomerModel;

  constructor(private auth:LoginService) {}

  ngOnInit():void {
    this.auth.customerProfile.subscribe(
      (data)=>{
        this.userInfo = data;
      });
  }

}
