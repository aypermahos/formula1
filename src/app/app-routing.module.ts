import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListViewComponent } from "@formula1.pages/list-view/list-view.component";
import {
  LocationStrategy,
  PathLocationStrategy,
  APP_BASE_HREF
} from "@angular/common";
import { DriverStandingsResolver } from "./resolvers/driver-standings.resolver";
import { SeasonsResolver } from "@formula1.resolvers/seasons.resolver";
import { DetailsViewComponent } from "@formula1.pages/details-view/details-view.component";
import { AngularButtonLoaderModule } from "angular-button-loader";

const routes: Routes = [
  { path: "", redirectTo: "/driverStandings", pathMatch: "full" },
  {
    path: "driverStandings",
    component: ListViewComponent,
    resolve: {
      details: DriverStandingsResolver,
      seasons: SeasonsResolver
    }
  },
  {
    path: "driverStandings/:year/:round",
    component: ListViewComponent,
    resolve: {
      details: DriverStandingsResolver,
      seasons: SeasonsResolver
    }
  },
  { path: "driverDetails", component: DetailsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AngularButtonLoaderModule.forRoot()],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: "/" }
  ]
})
export class AppRoutingModule {}
