import {Component, OnInit} from "@angular/core";
import {RouteModel} from "../../models/route.model";
import {LoginService} from "../../api/login-service/login.service";
import {Router} from "@angular/router";
import {deleteCookie} from "../../token/utils/cooke.utils";
import {RouteActiveModel} from "../../models/routeactive";
import {RoutesService} from "../../api/routes-service/routes-service";


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})

export class RoutesComponent implements OnInit{

  loading: boolean = false; // Add this line to define the loading property


  constructor(private router: Router,private route: RoutesService) {}

  activeRoutes: RouteActiveModel[] = [];

  // ngOnInit(): void {
  //   this.route-detail.getActiveRoutes().subscribe(
  //     (response: any) => {
  //       // Check if 'data' property exists and is an array
  //       if (response.data && Array.isArray(response.data)) {
  //         // Flatten the array if it's nested
  //         const routesArray = response.data.flat();
  //
  //         // Map each routeData to RouteActiveModel
  //         this.activeRoutes = routesArray.map(routeData => {
  //           return {
  //             id: routeData.id,
  //             driverVehicle: routeData.driverVehicle,
  //             routeCapacity: routeData.routeCapacity,
  //             origin: routeData.origin,
  //             destination: routeData.destination
  //             // Add other properties as needed
  //           };
  //         });
  //       } else {
  //         console.error('Invalid data structure in the response:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching active routes:', error);
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.loading = true; // Set loading to true before making the API call

    this.route.getActiveRoutes().subscribe(
      (response: any) => {
        if (response.data && Array.isArray(response.data)) {
          const routesArray = response.data.flat();
          this.activeRoutes = routesArray.map(routeData => {
            return {
              id: routeData.id,
              driverVehicle: routeData.driverVehicle,
              routeCapacity: routeData.routeCapacity,
              origin: routeData.origin,
              destination: routeData.destination
            };
          });

          console.log('Processed Routes:', this.activeRoutes);
        } else {
          console.error('Invalid data structure in the response:', response);
        }
      },
      (error) => {
        console.error('Error fetching active routes:', error);
      },
      () => {
        this.loading = false; // Set loading to false when the data is loaded (complete callback)
      }
    );
  }

  getRouteDetail(id:string):void{
    this.router.navigate(['/routedetail',id]);
  }







  onLogout():void{
    deleteCookie('token')
    this.router.navigate(['/login']);
  }
}
