import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemeberByPhooneComponent } from './remeber-by-phoone.component';

describe('RemeberByPhooneComponent', () => {
  let component: RemeberByPhooneComponent;
  let fixture: ComponentFixture<RemeberByPhooneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemeberByPhooneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemeberByPhooneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
