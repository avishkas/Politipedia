import { TestBed } from '@angular/core/testing';

import { GetInputService } from './get-input.service';

describe('GetInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetInputService = TestBed.get(GetInputService);
    expect(service).toBeTruthy();
  });
});
