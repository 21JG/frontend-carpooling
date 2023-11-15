import {Component} from "@angular/core";
import {RouteModel} from "../../models/route.model";
import {LoginService} from "../../api/login-service/login.service";
import {Router} from "@angular/router";
import {deleteCookie} from "../../token/utils/cooke.utils";


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})

export class RoutesComponent{

  constructor(private router: Router,private login: LoginService) {
  }

  routes:RouteModel[] = [
    {routeCapacity:2,pointsOfInterest:[{name:"Rionegro"},{name:"La Ceja"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"El Carman"},{name:"Rionegro"}]},
    {routeCapacity:4,pointsOfInterest:[{name:"San Antonio"},{name:"UCO"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"Medellin"},{name:"Santa Elena"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"El Peñol"},{name:"Marinilla"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"Guatapé"},{name:"El Peñol"}]},
    {routeCapacity:4,pointsOfInterest:[{name:"Alejandría"},{name:"San Carlos"}]},
  ]

  onLogout():void{
    deleteCookie('token')
    this.router.navigate(['/login']);
  }
}
