import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {RouteModel} from "../../models/route.model";
import {LoginService} from "../../api/login-service/login.service";
import {Router} from "@angular/router";
import {deleteCookie} from "../../token/utils/cooke.utils";
import {RouteActiveModel} from "../../models/routeactive";
import {RoutesService} from "../../api/routes-service/routes-service";
import {MapComponent} from "../../shared/map/map.component";


@Component({
  selector: 'app-route-detail',
  templateUrl: './routedetail.component.html',
  styleUrls: ['./routedetail.component.css'],
})

export class RouteDetailComponent implements OnInit{

  loading: boolean = false; // Add this line to define the loading property
  routeId: string;
  globalPlate: string;
  globalCapacity: number;
  markers=[];

  constructor(private router: Router,private route: RoutesService) {}

  routeDetail: RouteModel[] = [];



  ngOnInit(): void {
    this.loading = true; // Set loading to true before making the API call
    const routeId = this.getId();

    this.route.getRouteDetail(routeId).subscribe(
      (response: any) => {
        response.data.forEach(route => {
          const positions = response.data[0].positions?.map(position=>{
            if (position && position.latitude && position.longitude) {
              return {
                lat: position.latitude,
                lng: position.longitude,
                title: `Marker for Route ${route.id}`
              };
          }else{
            return {};
            }
            }
            );
          this.markers = positions;
        });
        console.log(this.markers)

        // Check if 'data' property exists and is an array
        if (response.data && Array.isArray(response.data)) {
          // Flatten the array if it's nested
          const routesArray = response.data.flat();

          // Map each routeData to RouteActiveModel
          this.routeDetail = routesArray.map(routeData => {
            this.globalPlate = routeData.driverVehicle.vehicle.plate;
            this.globalCapacity = routeData.routeCapacity;

            const flattenedPointsOfInterest = Array.isArray(routeData.pointOfInterest)
              ? routeData.pointOfInterest
              : [];


            return {
              id: routeData.id,
              driverVehicle: routeData.driverVehicle,
              routeCapacity: routeData.routeCapacity,
              pointsOfInterest: flattenedPointsOfInterest,
              position: routeData.position,
              routeTime:routeData.routeTime
            };
          });

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

  private getId (): string {
    // Extract the route ID from the current route
    const currentRoute = window.location.hash; // Assuming the ID is in the hash part of the URL
    const routeParts = currentRoute.split('/');
    const routeId = routeParts[routeParts.length - 1];
    return routeId;
  }








  onLogout():void{
    deleteCookie('token')
    this.router.navigate(['/login']);
  }
}
