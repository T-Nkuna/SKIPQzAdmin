import { TestBed } from '@angular/core/testing';

import { ExtraManagerService } from './extra-manager.service';

describe('ExtraManagerService', () => {
  let service: ExtraManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
