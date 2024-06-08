import {ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from "@angular/core";
import {RouteModel} from "../../models/route.model";
import {LoginService} from "../../api/login-service/login.service";
import {Router} from "@angular/router";
import {decrypt, deleteCookie, getCookie} from "../../token/utils/cooke.utils";
import {RouteActiveModel} from "../../models/routeactive";
import {RoutesService} from "../../api/routes-service/routes-service";
import {MapComponent} from "../../shared/map/map.component";
import {PositionModel} from "../../models/position.model";
import {DriverService} from "../../api/driver-service/driver.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})

export class RoutesComponent implements OnInit{


  loading: boolean = false;

  @ViewChild(MapComponent) mapComponent: MapComponent | undefined;

  activeRoutes: RouteActiveModel[] = [];
  email: string | null = null;
  isDriver: boolean = false; // Agregar esta propiedad
  private subscriptions = new Subscription();


  constructor(private router: Router,private route: RoutesService,private driver: DriverService, private cdr: ChangeDetectorRef,  private zone: NgZone) {}

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

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnInit(): void {
    this.checkDriverEmail();
    this.loading = true; // Set loading to true before making the API call

    this.route.getActiveRoutes().subscribe(
      (response: any) => {
        if (response.data && Array.isArray(response.data)) {
          const routesArray = response.data.flat();
          this.activeRoutes = routesArray.map(routeData => {
            const color = this.getRandomColor();

            return {
              id: routeData.id,
              driverVehicle: routeData.driverVehicle,
              routeCapacity: routeData.routeCapacity,
              origin: routeData.origin,
              destination: routeData.destination,
              color:color,
            };
          });

          console.log('Processed Routes:', this.activeRoutes);

          // if (this.mapComponent) {
          //   this.activeRoutes.forEach((route, index) => {
          //     const color = this.getRandomColor();
          //     const markerLetter = String.fromCharCode(65 + index);
          //
          //     this.geocodeAndDrawRoute(route, color, markerLetter);
          //
          //     this.geocodeCoordinates(route.origin, (originAddress: string) => {
          //       route.origin.address = originAddress;
          //     });
          //
          //     this.geocodeCoordinates(route.destination, (destinationAddress: string) => {
          //       route.destination.address = destinationAddress;
          //     });
          //
          //     this.cdr.detectChanges();
          //
          //     // this.mapComponent.drawRoute(
          //     //   { lng: route.origin.longitude, lat: route.origin.latitude, title: 'Origin' },
          //     //   { lat: route.destination.latitude, lng: route.destination.longitude, title: 'Destination' },
          //     //   color,
          //     //   markerLetter
          //     // );
          //   });
          // }

          if (this.mapComponent) {
            this.activeRoutes.forEach((route, index) => {
              this.zone.runOutsideAngular(() => {
                const markerLetter = String.fromCharCode(65 + index);

                this.geocodeAndDrawRoute(route, route.color, markerLetter);

                this.geocodeCoordinates(route.origin, (originAddress: string) => {
                  route.origin.address = originAddress;
                });

                this.geocodeCoordinates(route.destination, (destinationAddress: string) => {
                  route.destination.address = destinationAddress;
                });

              });
            });
          }

        } else {
          console.error('Invalid data structure in the response:', response);
        }
      },
      (error) => {
        console.error('Error fetching active routes:', error);
        console.error('Error message:', error.message);

      },
      () => {
        this.loading = false;
      }
    );
  }

  private geocodeAndDrawRoute(route: RouteActiveModel, color: string, markerLetter: string): void {
    this.geocodeCoordinates(route.origin, (originAddress: string) => {
      this.geocodeCoordinates(route.destination, (destinationAddress: string) => {
        this.mapComponent.drawRoute(
          { lng: route.origin.longitude, lat: route.origin.latitude, title: originAddress },
          { lat: route.destination.latitude, lng: route.destination.longitude, title: destinationAddress },
          color,
          markerLetter
        );
      });
    });
  }
  checkDriverEmail(): void {
    this.email = decrypt(getCookie('1P_JAR2'));

    this.subscriptions.add(
      this.driver.getDriver().subscribe(
        driverResponse => {
          const driversArray = driverResponse;
          const driver = driversArray.find(d => d.customer && d.customer.companyEmail === this.email);
          if (driver && driver.customer.companyEmail === this.email) {
            this.isDriver = true;
          } else {
            this.isDriver = false;
          }
        },
        error => {
          console.error('Error fetching driver data:', error);
          this.isDriver = false;
        }
      )
    );
  }

  // Update the type of the 'coordinates' parameter in the geocodeCoordinates function
  private geocodeCoordinates(coordinates: PositionModel, callback: (address: string) => void): void {
    const geocoder = new google.maps.Geocoder();

    // Ensure that latitude and longitude are numbers
    const lat = Number(coordinates.latitude);
    const lng = Number(coordinates.longitude);

    const latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latlng }, (results: any[], status: string) => {
      if (status === "OK") {
        if (results[0]) {
          callback(results[0].formatted_address);
        } else {
          console.error("No results found for the given coordinates");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }






  getRouteDetail(id:string):void{
    this.router.navigate(['/routedetail',id]);
  }
  getRouteCreation():void{
    this.router.navigate(['/routecreation']);
  }
  // getDrivers():void{
  //   this.router.navigate()
  // }

  // private geocodeCoordinates(coordinates: { latitude: number; longitude: number }, callback: (address: string) => void): void {
  //   const geocoder = new google.maps.Geocoder();
  //   const latlng = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
  //
  //   geocoder.geocode({ location: latlng }, (results, status) => {
  //     if (status === "OK") {
  //       if (results[0]) {
  //         callback(results[0].formatted_address);
  //       } else {
  //         console.error("No results found for the given coordinates");
  //       }
  //     } else {
  //       console.error("Geocoder failed due to: " + status);
  //     }
  //   });
  // }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }




  onLogout():void{
    deleteCookie('token')
    this.router.navigate(['/login']);
  }
}
