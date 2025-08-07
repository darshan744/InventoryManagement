import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductviewcardComponent } from './productviewcard.component';

describe('ProductviewcardComponent', () => {
  let component: ProductviewcardComponent;
  let fixture: ComponentFixture<ProductviewcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductviewcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductviewcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
