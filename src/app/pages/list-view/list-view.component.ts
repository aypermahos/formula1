import { Component, OnInit } from "@angular/core";
import { DriverStandingsService } from "@formula1.services/DriverStandings/driver-standings.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StandingsLists } from "@formula1.models/StandingsLists";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Season } from "@formula1.models/Season";
import { DataService } from "@formula1.services/DataSharing/data.service";
import { Driver } from "@formula1.models/Driver";
import { AngularButtonLoaderService } from "angular-button-loader";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"]
})
export class ListViewComponent implements OnInit {
  public standingsList: StandingsLists;
  public faSearch = faSearch;
  public searchForm: FormGroup;
  public searchSeasonForm: FormGroup;
  public seasons: Season[];

  constructor(
    private driverStandingsService: DriverStandingsService,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private buttonLoaderService: AngularButtonLoaderService
  ) {}

  ngOnInit() {
    // Get data from resolvers
    this.standingsList = this.route.snapshot.data.details.StandingsLists[0];
    this.seasons = this.route.snapshot.data.seasons;

    this.initialiseSearchForm();
    this.initialiseSearchSeasonForm();
  }

  private initialiseSearchSeasonForm() {
    this.searchSeasonForm = new FormGroup({
      seasonField: new FormControl("", Validators.required)
    });
  }
  private initialiseSearchForm() {
    this.searchForm = new FormGroup({
      searchField: new FormControl("", Validators.required)
    });
  }

  // In case the user searches for an empty string, we reset the form, else
  // we search for the search field
  public searchSubmit() {
    //query for the search field
    let searchField = this.searchForm.get("searchField").value.toUpperCase();
    if (searchField != "") {
      let filtered_results = this.standingsList.DriverStandings.filter(st => {
        if (
          st.Driver.givenName.toUpperCase().includes(searchField) ||
          st.Driver.familyName.toUpperCase().includes(searchField) ||
          st.Constructors[0].name.toUpperCase().includes(searchField) ||
          st.wins == searchField ||
          st.position == searchField
        ) {
          return st;
        }
      });
      this.standingsList.DriverStandings = filtered_results;
    } else {
      this.buttonLoaderService.displayLoader();
      this.driverStandingsService
        .getDriverStandings(this.standingsList.season, this.standingsList.round)
        .subscribe(res => {
          this.buttonLoaderService.hideLoader();
          if (res) {
            this.standingsList = res.StandingsLists[0];
          }
        });
    }

    // scroll to the top of the div each time user searches
    document.getElementById("searchDiv").scroll(0, 0);
  }

  public searchForSeason() {
    let seasonField = this.searchSeasonForm.get("seasonField").value;
    if (seasonField != "") {
      this.buttonLoaderService.displayLoader();
      this.driverStandingsService
        .getDriverStandings(seasonField, "")
        .subscribe(res => {
          this.buttonLoaderService.hideLoader();
          if (res) {
            this.standingsList = res.StandingsLists[0];
          }
        });
    }
  }

  public selectDriver(selectedDriver: Driver) {
    this.data.selectDriver(selectedDriver);
    this.router.navigate(["driverDetails"]);
  }
}
