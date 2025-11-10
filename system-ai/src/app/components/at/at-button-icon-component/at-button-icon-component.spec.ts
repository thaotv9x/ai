import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtButtonIconComponent } from './at-button-icon-component';

describe('AtButtonIconComponent', () => {
  let component: AtButtonIconComponent;
  let fixture: ComponentFixture<AtButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtButtonIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
