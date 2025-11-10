import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtInputPasswordComponent } from './at-input-password-component';

describe('AtInputPasswordComponent', () => {
  let component: AtInputPasswordComponent;
  let fixture: ComponentFixture<AtInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtInputPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
