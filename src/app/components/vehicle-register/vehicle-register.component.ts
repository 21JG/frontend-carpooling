import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService} from "ngx-toastr";
import { VehicleService } from '../../api/vehicle-service/vehicle.service';
import { driverService } from '../../api/driver-service/driver.service';
import { VehicleModel } from '../../models/vehicle.model';
import { DriverModel} from "../../models/driver.model";
import { DriverStateLoginService } from "../../api/driver-service/driverStateLogin.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegistrationComponent implements OnInit {
    
  public VehicleForm !: FormGroup;
  private driver: DriverModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,  
    private driverStateLoginService: DriverStateLoginService,
    private driverService: driverService,
    private toastr:ToastrService) {
    this.VehicleForm = this.fb.group({
      name: ['', Validators.required],
      plate: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.driverStateLoginService.currentDriver.subscribe(driver => {
      if (driver) {
        this.driverService.getDriverByLicense(driver.licenseNumber).subscribe({
          next: (fetchedDriver: DriverModel) => {
            this.driver = fetchedDriver;
          },
          error: (error) => {
            this.toastr.error('Failed to fetch driver information');
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  registerVehicle() {
    if (this.VehicleForm.valid) {
        const vehicleData: VehicleModel = {
        plate: this.VehicleForm.value.plate,
        capacity: this.VehicleForm.value.capacity,
        owner: {
          id: this.driver.id,
          licenseNumber: this.driver.licenseNumber,
          customer: this.driver.customer,
          authorizedCategory: this.driver.authorizedCategory
        }
      };
      this.vehicleService.createVehicle(vehicleData).subscribe({
        next: (response) => {
          this.toastr.success("Vehicle registered successfully");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.info(vehicleData.owner.id)
          this.toastr.error("Failed to register vehicle");
        }
      });
    } else {
      this.toastr.warning("Please fill out the form correctly");
    }
  }
}
