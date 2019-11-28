import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UtilService } from "@formula1.services/Util/util-service.service";
import { map } from "rxjs/operators";
import { Race } from "@formula1.models/Race";

@Injectable({
  providedIn: "root"
})
export class DriverResultsService {
  static readonly URL_GET_DRIVER_RESULTS = "/f1/drivers/:driver/results.json";
  constructor(private http: HttpClient) {}

  public getDriversResults(driver: String): Observable<Race[]> {
    return this.http
      .get<any>(
        UtilService.getUrl(DriverResultsService.URL_GET_DRIVER_RESULTS, [
          { k: ":driver", v: driver }
        ])
      )
      .pipe(
        map(res => {
          let response = res.MRData.RaceTable.Races;
          return response;
        })
      );
  }
}
