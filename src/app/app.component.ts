import {Component, OnInit} from '@angular/core';
import {userModel} from "./models/user.model";
import {LoginService} from "./api/login-service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend-carpooling';
  userInfo?:userModel;

  constructor(private auth:LoginService) {}

  ngOnInit():void {
    this.auth.userProfile.subscribe(
      (data)=>{
        this.userInfo = data;
      });
  }

}
