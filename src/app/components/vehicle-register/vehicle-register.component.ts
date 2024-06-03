import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../api/vehicle-service/vehicle.service';
import { VehicleModel } from '../../models/vehicle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegistrationComponent implements OnInit {
    
  public VehicleForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService  ) {
    this.VehicleForm = this.fb.group({
      name: ['', Validators.required],
      plate: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  registerVehicle() {
    if (this.VehicleForm.valid) {
      const vehicleData: VehicleModel = {
        id: 'string',
        plate: this.VehicleForm.value.plate,
        capacity: this.VehicleForm.value.capacity,
        owner: {
          id: 'string',
          licenseNumber: 'string',
          customer: {
            id: 'string',
            dni: 'string',
            firstName: this.VehicleForm.value.name,
            secondName: 'string',
            firstSurname: 'string',
            secondSurname: 'string',
            password: 'string',
            phone: 'string',
            companyEmail: 'string',
          },
          authorizedCategory: {
            id: 'string',
            category: 'string',
          }
        }
      };

      this.vehicleService.createVehicle(vehicleData).subscribe(response => {
        //console.log('Vehicle registered:', response);
        this.router.navigate(['/login'])
      });
    }
  }
}
