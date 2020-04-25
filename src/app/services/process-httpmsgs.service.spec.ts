import { TestBed } from '@angular/core/testing';

import { ProcessHTTPMsgsService } from './process-httpmsgs.service';

describe('ProcessHTTPMsgsService', () => {
  let service: ProcessHTTPMsgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessHTTPMsgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
