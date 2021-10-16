import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByGenderComponent } from './shop-by-gender.component';

describe('ShopByGenderComponent', () => {
  let component: ShopByGenderComponent;
  let fixture: ComponentFixture<ShopByGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopByGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopByGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
