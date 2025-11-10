import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoInputPasswordComponent } from './mo-input-password-component';

describe('MoInputPasswordComponent', () => {
  let component: MoInputPasswordComponent;
  let fixture: ComponentFixture<MoInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoInputPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
