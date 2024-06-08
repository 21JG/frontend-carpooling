import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { RoutesService } from "../../api/routes-service/routes-service";
import { DriverService } from "../../api/driver-service/driver.service";
import { DriverStateLoginService } from "../../api/driver-service/driverStateLogin.service";
import { LoginService } from "../../api/login-service/login.service";
import { decrypt, deleteCookie, getCookie } from "../../token/utils/cooke.utils";
import {EMPTY, Subscription, switchMap, tap} from 'rxjs';
import { MapComponent } from "../../shared/map/map.component";
import { VehicleService } from "../../api/vehicle-service/vehicle.service";
import { RouteRequestModel } from "../../models/routerequest.model";
import { forkJoin } from 'rxjs';
import { DriverpervehicleModel } from "../../models/driverpervehicle.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-route-detail',
  templateUrl: './routecreation.component.html',
  styleUrls: ['./routecreation.component.css'],
})
export class RouteCreationComponent implements OnInit, OnDestroy {

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  loadingMap: boolean = true;
  loading: boolean = false;
  routeId: string;
  globalPlate: string;
  globalModel: string;
  globalCapacity: number;
  selectedTime: string = '';
  selectedCapacity: number;
  globalDriverName: string;
  termsAccepted = false;
  routeRequestOriginLatitude: string = '';
  routeRequestOriginLongitude: string = '';
  routeRequestEndLatitude: string | null = null;
  routeRequestEndLongitude: string | null = null;
  driverId: string | undefined;
  nextButtonDisabled: boolean = true;

  step0Enabled = true;
  step1Enabled = false;
  step2Enabled = false;

  step = 0;
  markers = [];

  routeDetail: RouteRequestModel[] = [];
  vehicleCapacities: number[] = [];
  DriverForm!: FormGroup;
  hidePassword: boolean = true;
  capacities: number[] = [1];

  email: string;
  firstClick = true;
  isDriver: boolean = false;
  public RouteCreationForm!: FormGroup;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private routeService: RoutesService,
    private formBuilder: FormBuilder,
    private driverService: DriverService,
    private driverStateLoginService: DriverStateLoginService,
    private tokenService: LoginService,
    private vehicleService: VehicleService,
    private toast: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loading = true;
    this.loadingMap = true;
    console.log('Form initialized:', this.DriverForm);
    this.checkDriver();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeForm() {
    this.DriverForm = this.formBuilder.group({
      id: [''],
      driverVehicle: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        nameVehicle: ['', Validators.required]
      }),
      routeRequestOriginLatitude: ['', Validators.required],
      routeRequestOriginLongitude: ['', Validators.required],
      routeRequestEndLatitude: ['', Validators.required],
      routeRequestEndLongitude: ['', Validators.required],
      routeCapacity: [1, Validators.required]
    });
  }

  setStep(index: number) {
    if (index === 0) {
      this.step0Enabled = true;
      this.step1Enabled = false;
      this.step2Enabled = false;
    } else if (index === 1 && this.step0Enabled) {
      this.step1Enabled = true;
      this.step2Enabled = false;
    } else if (index === 2 && this.step1Enabled) {
      this.step2Enabled = true;
    }
    this.step = index;
  }

  nextStep() {
    this.step++;
    if (this.step === 1) {
    } else if (this.step === 2) {
      if (this.routeRequestOriginLatitude && this.routeRequestOriginLongitude && this.routeRequestEndLatitude && this.routeRequestEndLongitude) {
        this.drawRoute(
          { lat: this.routeRequestOriginLatitude, lng: this.routeRequestOriginLongitude, title: 'Punto de partida' },
          { lat: this.routeRequestEndLatitude, lng: this.routeRequestEndLongitude, title: 'Punto de destino' }
        );
      } else {
        console.error('No se han establecido puntos de partida y destino.');
      }
    } else if (this.step === 3) {
      this.DriverForm.patchValue({
        routeCapacity: this.selectedCapacity
      });
    }
  }

  arePointsDefined(): boolean {
    return !!this.routeRequestOriginLatitude && !!this.routeRequestOriginLongitude && !!this.routeRequestEndLatitude && !!this.routeRequestEndLongitude;
  }

  canAccessStep(stepNumber: number): boolean {
    switch (stepNumber) {
      case 1:
        return this.step >= 0;
      case 2:
        return this.step >= 1;
      default:
        return false;
    }
  }

  checkCoordinates() {
    if (this.routeRequestOriginLatitude !== '' && this.routeRequestOriginLongitude !== '' && this.routeRequestEndLatitude !== null && this.routeRequestEndLongitude !== null) {
      this.nextButtonDisabled = false;
    } else {
      this.nextButtonDisabled = true;
    }
  }

  prevStep() {
    if (!this.canAccessStep(this.step - 1)) {
      return;
    }
    this.step--;
  }

  handleTimeSelection(time: string) {
    const formattedTime = new Date(time).toISOString();
    this.selectedTime = formattedTime;
    this.DriverForm.patchValue({
      routeTime: formattedTime
    });
  }

  onLogout(): void {
    deleteCookie('token');
    this.router.navigate(['/login']);
  }

  onMapClick(event: any) {
    const latitude = event.coords.lat;
    const longitude = event.coords.lng;

    this.markers.push({
      lat: latitude.toString(),
      lng: longitude.toString(),
      title: 'Punto de interés'
    });

    const positionsFormArray = this.DriverForm.get('positions') as FormArray;
    positionsFormArray.push(this.formBuilder.group({
      latitude: [latitude, Validators.required],
      longitude: [longitude, Validators.required]
    }));
  }

  drawRoute(origin: any, destination: any) {
    this.mapComponent.drawRoute(origin, destination);
    this.routeRequestOriginLatitude = origin.lat.toString();
    this.routeRequestOriginLongitude = origin.lng.toString();
    this.routeRequestEndLatitude = destination.lat.toString();
    this.routeRequestEndLongitude = destination.lng.toString();
  }

  handleMapClick(event: any) {
    console.log('Map click event:', event);

    if (event && event.lat && event.lng) {
      const latitude = event.lat;
      const longitude = event.lng;

      if (!this.routeRequestOriginLatitude || !this.routeRequestOriginLongitude) {
        this.routeRequestOriginLatitude = latitude;
        this.routeRequestOriginLongitude = longitude;
        console.log('Punto de partida:');
        console.log('Latitud:', this.routeRequestOriginLatitude);
        console.log('Longitud:', this.routeRequestOriginLongitude);
      } else if (!this.routeRequestEndLatitude || !this.routeRequestEndLongitude) {
        this.routeRequestEndLatitude = latitude;
        this.routeRequestEndLongitude = longitude;
        console.log('Punto de destino:');
        console.log('Latitud:', this.routeRequestEndLatitude);
        console.log('Longitud:', this.routeRequestEndLongitude);

        this.drawRoute(
          { lat: this.routeRequestOriginLatitude, lng: this.routeRequestOriginLongitude, title: 'Punto de partida' },
          { lat: this.routeRequestEndLatitude, lng: this.routeRequestEndLongitude, title: 'Punto de destino' }
        );
        this.checkCoordinates();
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 1000);
      } else {
        console.error('Ya se han establecido puntos de partida y destino.');
        return;
      }
      this.mapComponent.addMarker({ lat: latitude, lng: longitude });
    } else {
      console.error('Event does not contain coords:', event);
    }
  }

  createRoute() {
    console.log('Formulario antes de la validación:', this.DriverForm);
    console.log('Valores del formulario:', this.DriverForm.value);

    if (this.routeRequestOriginLatitude && this.routeRequestOriginLongitude &&
      this.routeRequestEndLatitude && this.routeRequestEndLongitude &&
      this.selectedCapacity) {
      this.DriverForm.patchValue({
        routeRequestOriginLatitude: this.routeRequestOriginLatitude,
        routeRequestOriginLongitude: this.routeRequestOriginLongitude,
        routeRequestEndLatitude: this.routeRequestEndLatitude,
        routeRequestEndLongitude: this.routeRequestEndLongitude,
        routeCapacity: this.selectedCapacity
      });

      if (this.DriverForm.valid) {
        console.log('El formulario es válido');
        const routeData = this.DriverForm.value;
        console.log('Datos de la ruta:', routeData);
        // Aquí puedes agregar la lógica para guardar la ruta
      } else {
        console.log('El formulario es inválido');
        console.log('Errores de validación del formulario:', this.DriverForm.errors);
        console.log('Valores del formulario:', this.DriverForm.value);
      }
    } else {
      console.error('Los campos requeridos no están llenos.');
    }
  }

  updateFormData() {
    this.routeRequestOriginLatitude = this.DriverForm.get('routeRequestOriginLatitude').value;
    console.log('Route Origin Latitude:', this.routeRequestOriginLatitude);
    this.routeRequestOriginLongitude = this.DriverForm.get('routeRequestOriginLongitude').value;
    console.log('Route Origin Longitude:', this.routeRequestOriginLongitude);
    this.routeRequestEndLatitude = this.DriverForm.get('routeRequestEndLatitude').value;
    console.log('Route End Latitude:', this.routeRequestEndLatitude);
    this.routeRequestEndLongitude = this.DriverForm.get('routeRequestEndLongitude').value;
    console.log('Route End Longitude:', this.routeRequestEndLongitude);

    this.capacities = [...this.vehicleCapacities];
    console.log('Updated capacities:', this.capacities);
    if (this.capacities.length === 0) {
      this.capacities.push(4);
    }
    this.DriverForm.controls['routeCapacity'].setValue(this.capacities[0]);
    console.log('Selected Capacity:', this.DriverForm.get('routeCapacity').value);

    this.cdr.detectChanges();
  }

  updateCapacities() {
    this.capacities = [...this.vehicleCapacities];
    console.log('Updated capacities:', this.capacities);
    if (this.capacities.length === 0) {
      this.capacities.push(4);
    }
    this.DriverForm.controls['routeCapacity'].setValue(this.capacities[0]);
    this.cdr.detectChanges();
  }

  checkDriver(): void {
    this.email = decrypt(getCookie('1P_JAR2'));
    this.subscriptions.add(
      this.driverService.getDriver().pipe(
        switchMap(driversArray => {
          const driver = driversArray.find(d => d.customer && d.customer.companyEmail === this.email);
          if (!driver) {
            this.isDriver = false;
            return EMPTY;
          }
          this.isDriver = true;
          this.driverId = driver.id;
          console.log('Driver ID:', this.driverId);
          return this.vehicleService.getCarsPerDriver(driver.id).pipe(
            tap(vehicle => console.log('Información del vehículo:', vehicle)),
            map(vehicle => ({ driver, vehicle }))
          );
        })
      ).subscribe(
        ({ driver, vehicle }) => {
          this.RouteCreationForm.patchValue({
            driverVehicle: {
              driverVehicleId: vehicle.id,
              name: vehicle.plate,
              nameVehicle: vehicle.name,
            },
            driverId: driver.id,
            license:driver.licenseNumber,



            routeCapacity: vehicle.capacity,
          });
          this.vehicleCapacities.push(vehicle.capacity);
          console.log('Vehicle capacities:', this.vehicleCapacities);
          this.updateCapacities();
        },
        error => {
          console.error('Error fetching driver data:', error);
        }
      )
    );
  }




  validateForm() {
    console.log('Validating form...');
    if (this.DriverForm.valid) {
      console.log('El formulario es válido');
    } else {
      console.log('El formulario es inválido');
      console.log('Errores de validación del formulario:', this.DriverForm.errors);
      console.log('Valores del formulario:', this.DriverForm.value);
    }
  }
}
