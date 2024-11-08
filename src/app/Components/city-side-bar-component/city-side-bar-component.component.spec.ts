import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySideBarComponentComponent } from './city-side-bar-component.component';

describe('CitySideBarComponentComponent', () => {
  let component: CitySideBarComponentComponent;
  let fixture: ComponentFixture<CitySideBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySideBarComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySideBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
