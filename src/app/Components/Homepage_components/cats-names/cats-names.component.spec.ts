import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsNamesComponent } from './cats-names.component';

describe('CatsNamesComponent', () => {
  let component: CatsNamesComponent;
  let fixture: ComponentFixture<CatsNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatsNamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatsNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
