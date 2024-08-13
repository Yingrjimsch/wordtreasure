import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordTestComponent } from './word-test.component';

describe('WordTestComponent', () => {
  let component: WordTestComponent;
  let fixture: ComponentFixture<WordTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
