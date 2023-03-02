import { TestBed } from '@angular/core/testing';

import { VisitorService } from './visitors.service';

describe('VisitorsService', () => {
  let service: VisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
