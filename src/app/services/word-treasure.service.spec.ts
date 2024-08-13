import { TestBed } from '@angular/core/testing';

import { WordTreasureService } from './word-treasure.service';

describe('WordTreasureService', () => {
  let service: WordTreasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordTreasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
