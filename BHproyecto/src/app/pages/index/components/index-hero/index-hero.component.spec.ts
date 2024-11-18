import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexHeroComponent } from './index-hero.component';

describe('IndexHeroComponent', () => {
  let component: IndexHeroComponent;
  let fixture: ComponentFixture<IndexHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
