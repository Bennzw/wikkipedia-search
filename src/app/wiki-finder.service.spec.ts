import { TestBed } from '@angular/core/testing';

import { WikiFinderService } from './wiki-finder.service';

describe('WikiFinderService', () => {
  let service: WikiFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
