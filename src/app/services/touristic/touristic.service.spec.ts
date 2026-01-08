import { TestBed } from '@angular/core/testing';

import { TouristicService } from './touristic.service';

describe('TouristicService', () => {
  let service: TouristicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
