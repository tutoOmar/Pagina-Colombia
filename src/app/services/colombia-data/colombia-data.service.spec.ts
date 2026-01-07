import { TestBed } from '@angular/core/testing';
import { ColombiaDataService } from './colombia-data.service';

describe('ColombiaDataService', () => {
  let service: ColombiaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColombiaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
