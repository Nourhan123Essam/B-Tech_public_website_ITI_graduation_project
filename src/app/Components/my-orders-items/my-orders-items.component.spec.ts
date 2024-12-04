import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersItemsComponent } from './my-orders-items.component';

describe('MyOrdersItemsComponent', () => {
  let component: MyOrdersItemsComponent;
  let fixture: ComponentFixture<MyOrdersItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOrdersItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
