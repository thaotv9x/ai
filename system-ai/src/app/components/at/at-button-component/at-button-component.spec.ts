import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtButtonComponent } from './at-button-component';

describe('AtButtonComponent', () => {
  let component: AtButtonComponent;
  let fixture: ComponentFixture<AtButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
