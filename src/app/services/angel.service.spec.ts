import { TestBed } from '@angular/core/testing';

import { AngelService } from './angel.service';

describe('AngelService', () => {
  let service: AngelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
