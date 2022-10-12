import { TestBed } from '@angular/core/testing';

import { MongoDataService } from './mongo-data.service';

describe('MongoDataService', () => {
  let service: MongoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
