import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollForwardComponent } from './scroll-forward.component';

describe('ScrollForwardComponent', () => {
  let component: ScrollForwardComponent;
  let fixture: ComponentFixture<ScrollForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollForwardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
