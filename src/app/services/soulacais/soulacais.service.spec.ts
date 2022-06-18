import { TestBed } from '@angular/core/testing';

import { SoulacaisService } from './soulacais.service';

describe('SoulacaisService', () => {
  let service: SoulacaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoulacaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
