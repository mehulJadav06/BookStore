import { TestBed } from '@angular/core/testing';

import { SharedServiceService } from './shared-service.service';

describe('SharedServiceService', () => {
  let service: SharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServiceService);
  });
});
