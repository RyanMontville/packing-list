import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsListComponent } from './tts-list.component';

describe('TtsListComponent', () => {
  let component: TtsListComponent;
  let fixture: ComponentFixture<TtsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
