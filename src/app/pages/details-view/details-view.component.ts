import { Component, OnInit } from "@angular/core";
import { DataService } from "@formula1.services/DataSharing/data.service";
import { Driver } from "@formula1.models/Driver";
import { DriverResultsService } from "@formula1.services/DriverResults/driver-results.service";
import { Race } from "@formula1.models/Race";
import { Location } from "@angular/common";
import {
  faArrowDown,
  faArrowUp,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-details-view",
  templateUrl: "./details-view.component.html",
  styleUrls: ["./details-view.component.scss"]
})
export class DetailsViewComponent implements OnInit {
  public driver: Driver;
  public races: Race[];
  public seasonDirection: boolean = false;
  public roundDirection: boolean = false;
  public grandPrixDirection: boolean = false;
  public teamDirection: boolean = false;
  public gridDirection: boolean = false;
  public lapsDirection: boolean = false;
  public faArrowDown = faArrowDown;
  public faArrowUp = faArrowUp;
  public faArrowLeft = faArrowLeft;

  constructor(
    private data: DataService,
    private driverResultsService: DriverResultsService,
    private location: Location
  ) {}

  ngOnInit() {
    // Get the selected driver from shared service (DataService)
    this.data.currentData.subscribe(selectedDriver => {
      this.driver = selectedDriver;
      this.getRacingResults(this.driver.driverId);
    });
  }

  private getRacingResults(driver: string) {
    this.driverResultsService.getDriversResults(driver).subscribe(res => {
      if (res) {
        this.races = res;
      }
    });
  }

  public goBack() {
    this.location.back();
  }

  // Gets the attribute that should be sorted and a boolean that represents ->
  // true -> ascending, false -> descending
  // Columns that represent numbers are converted to integer to sort them properly
  public sort(attribute: number, sort: boolean) {
    if (attribute === 1) {
      this.seasonDirection = !this.seasonDirection;
      sort
        ? this.races.sort((a, b) => a.season.localeCompare(b.season))
        : this.races.sort((b, a) => a.season.localeCompare(b.season));
    } else if (attribute === 2) {
      this.roundDirection = !this.roundDirection;
      sort
        ? this.races.sort((a, b) => parseInt(a.round) - parseInt(b.round))
        : this.races.sort((b, a) => parseInt(a.round) - parseInt(b.round));
    } else if (attribute === 3) {
      this.grandPrixDirection = !this.grandPrixDirection;
      sort
        ? this.races.sort((a, b) => a.raceName.localeCompare(b.raceName))
        : this.races.sort((b, a) => a.raceName.localeCompare(b.raceName));
    } else if (attribute === 4) {
      this.teamDirection = !this.teamDirection;
      sort
        ? this.races.sort((a, b) =>
            a.Results[0].Constructor.name.localeCompare(
              b.Results[0].Constructor.name
            )
          )
        : this.races.sort((b, a) =>
            a.Results[0].Constructor.name.localeCompare(
              b.Results[0].Constructor.name
            )
          );
    } else if (attribute === 5) {
      this.gridDirection = !this.gridDirection;
      sort
        ? this.races.sort(
            (a, b) => parseInt(a.Results[0].grid) - parseInt(b.Results[0].grid)
          )
        : this.races.sort(
            (b, a) => parseInt(a.Results[0].grid) - parseInt(b.Results[0].grid)
          );
    } else if (attribute === 6) {
      this.lapsDirection = !this.lapsDirection;
      sort
        ? this.races.sort(
            (a, b) => parseInt(a.Results[0].laps) - parseInt(b.Results[0].laps)
          )
        : this.races.sort(
            (b, a) => parseInt(a.Results[0].laps) - parseInt(b.Results[0].laps)
          );
    }
  }
}
