import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoInputComponent } from './mo-input-component';

describe('MoInputComponent', () => {
  let component: MoInputComponent;
  let fixture: ComponentFixture<MoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
