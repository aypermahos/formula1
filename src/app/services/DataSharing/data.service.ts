import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Driver } from "@formula1.models/Driver";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public driver: Driver;
  public dataSource = new BehaviorSubject(this.driver);
  public currentData = this.dataSource.asObservable();

  constructor() {}

  public selectDriver(driver: Driver) {
    this.dataSource.next(driver);
  }
}
