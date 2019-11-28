import { TestBed } from '@angular/core/testing';

import { DriverResultsService } from './driver-results.service';

describe('DriverResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverResultsService = TestBed.get(DriverResultsService);
    expect(service).toBeTruthy();
  });
});
