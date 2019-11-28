import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DriverStandingsService } from "@formula1.services/DriverStandings/driver-standings.service";
import { Season } from "@formula1.models/Season";

@Injectable()
export class SeasonsResolver implements Resolve<any> {
  constructor(private driverStandingService: DriverStandingsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Season[]> {
    return this.driverStandingService.getSeasons();
  }
}
