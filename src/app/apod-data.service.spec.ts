import { TestBed } from '@angular/core/testing';

import { ApodDataService } from './apod-data.service';

describe('ApodDataService', () => {
  let service: ApodDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApodDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
