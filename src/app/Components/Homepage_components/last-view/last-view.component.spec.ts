import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastViewComponent } from './last-view.component';

describe('LastViewComponent', () => {
  let component: LastViewComponent;
  let fixture: ComponentFixture<LastViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
