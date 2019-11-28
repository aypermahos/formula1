import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UtilService } from "@formula1.services/Util/util-service.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { StandingsTable } from "@formula1.models/StandingsTable";
import { Season } from "@formula1.models/Season";

@Injectable({
  providedIn: "root"
})
export class DriverStandingsService {
  static readonly URL_GET_DRIVER_STANDINGS_WITH_YEAR_AND_ROUND =
    "/f1/:year/:round/driverStandings.json";
  static readonly URL_GET_DRIVER_STANDINGS_WITH_YEAR =
    "/f1/:year/driverStandings.json";
  static readonly URL_GET_DRIVER_STANDINGS =
    "/f1/current/last/driverStandings.json";

  static readonly URL_GET_SEASONS = "/f1/seasons.json";
  constructor(private http: HttpClient) {}

  public getDriverStandings(
    year: string = null,
    round: string = null
  ): Observable<StandingsTable> {
    let query;
    if (year || round) {
      let url;
      if (round) {
        // Url has year and round parameters
        url =
          DriverStandingsService.URL_GET_DRIVER_STANDINGS_WITH_YEAR_AND_ROUND;
      } else {
        // Url has only year parameter
        url = DriverStandingsService.URL_GET_DRIVER_STANDINGS_WITH_YEAR;
      }
      query = UtilService.getUrl(url, [
        { k: ":year", v: year },
        { k: ":round", v: round }
      ]);
    } else {
      query = UtilService.getUrl(
        DriverStandingsService.URL_GET_DRIVER_STANDINGS
      );
    }
    return this.http.get<any>(query).pipe(
      map(res => {
        let response = res.MRData.StandingsTable;
        return response;
      })
    );
  }

  public getSeasons(): Observable<Season[]> {
    return this.http
      .get<any>(UtilService.getUrl(DriverStandingsService.URL_GET_SEASONS))
      .pipe(
        map(res => {
          let response = res.MRData.SeasonTable.Seasons;
          return response;
        })
      );
  }
}
