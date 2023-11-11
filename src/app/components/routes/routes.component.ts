import {Component} from "@angular/core";
import {RouteModel} from "../../models/route.model";


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})

export class RoutesComponent{

  routes:RouteModel[] = [
    {routeCapacity:2,pointsOfInterest:[{name:"Rionegro"},{name:"La Ceja"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"El Carman"},{name:"Rionegro"}]},
    {routeCapacity:4,pointsOfInterest:[{name:"San Antonio"},{name:"UCO"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"Medellin"},{name:"Santa Elena"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"El Peñol"},{name:"Marinilla"}]},
    {routeCapacity:3,pointsOfInterest:[{name:"Guatapé"},{name:"El Peñol"}]},
    {routeCapacity:4,pointsOfInterest:[{name:"Alejandría"},{name:"San Carlos"}]},
  ]

}
