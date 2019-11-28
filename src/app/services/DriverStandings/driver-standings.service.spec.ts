import { TestBed } from "@angular/core/testing";

import { DriverStandingsService } from "./driver-standings.service";

describe("DriverStandingsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DriverStandingsService = TestBed.get(DriverStandingsService);
    expect(service).toBeTruthy();
  });
});
