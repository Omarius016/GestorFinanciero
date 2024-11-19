import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHeroComponent } from './login-hero.component';

describe('LoginHeroComponent', () => {
  let component: LoginHeroComponent;
  let fixture: ComponentFixture<LoginHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
