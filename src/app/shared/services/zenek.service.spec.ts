import { TestBed } from '@angular/core/testing';

import { ZenekService } from './zenek.service';

describe('ZenekService', () => {
  let service: ZenekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZenekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
