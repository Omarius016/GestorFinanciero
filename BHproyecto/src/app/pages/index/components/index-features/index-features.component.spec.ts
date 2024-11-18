import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFeaturesComponent } from './index-features.component';

describe('IndexFeaturesComponent', () => {
  let component: IndexFeaturesComponent;
  let fixture: ComponentFixture<IndexFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
