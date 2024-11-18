import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFooterComponent } from './index-footer.component';

describe('IndexFooterComponent', () => {
  let component: IndexFooterComponent;
  let fixture: ComponentFixture<IndexFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
