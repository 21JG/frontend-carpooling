import {Component} from "@angular/core";
import {RouteModel} from "../../models/route.model";


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})

export class RoutesComponent{

  public isChangedBlock = {};
  public minimize_routeslist:boolean = false
  public search: string
  public GPSData: Array<RouteModel> = []
  public popDevice: RouteModel
  public selectedRoute: RouteModel






  public centerViewToDevice(route:RouteModel) {
  }
  public removeSelected() {
  }
}
