import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "@formula1/app-routing.module";
import { AppComponent } from "@formula1/app.component";
import { ListViewComponent } from "@formula1.pages/list-view/list-view.component";
import { DetailsViewComponent } from "@formula1.pages/details-view/details-view.component";
import { DriverStandingsResolver } from "@formula1.resolvers/driver-standings.resolver";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SeasonsResolver } from "@formula1.resolvers/seasons.resolver";
import { AngularButtonLoaderModule } from "angular-button-loader";

@NgModule({
  declarations: [AppComponent, ListViewComponent, DetailsViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularButtonLoaderModule
  ],
  providers: [DriverStandingsResolver, SeasonsResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
