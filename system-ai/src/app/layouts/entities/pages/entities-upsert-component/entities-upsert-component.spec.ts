import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesUpsertComponent } from './entities-upsert-component';

describe('EntitiesUpsertComponent', () => {
  let component: EntitiesUpsertComponent;
  let fixture: ComponentFixture<EntitiesUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitiesUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
