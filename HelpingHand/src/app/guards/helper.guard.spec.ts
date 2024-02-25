import { TestBed } from '@angular/core/testing';

import { HelperGuard } from './helper.guard';

describe('HelperGuard', () => {
  let guard: HelperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HelperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
