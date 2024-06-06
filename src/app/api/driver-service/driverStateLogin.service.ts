import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DriverModel } from '../../models/driver.model';

@Injectable({
  providedIn: 'root'
})


export class DriverStateLoginService {
  private driverSource = new BehaviorSubject<DriverModel | null>(null);
  currentDriver = this.driverSource.asObservable();

  setDriver(driver: DriverModel) {
    this.driverSource.next(driver);
  }

  clearDriver() {
    this.driverSource.next(null);
  }
}
