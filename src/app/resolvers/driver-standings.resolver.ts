import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { DriverStandingsService } from "@formula1.services/DriverStandings/driver-standings.service";
import { StandingsTable } from "@formula1.models/StandingsTable";

@Injectable()
export class DriverStandingsResolver implements Resolve<any> {
  constructor(private driverStandingService: DriverStandingsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<StandingsTable> {
    const year: any = route.params["year"];
    const round: any = route.params["round"];
    return this.driverStandingService.getDriverStandings(year, round);
  }
}
