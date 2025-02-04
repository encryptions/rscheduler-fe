import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpanelComponent } from './loginpanel.component';

describe('LoginpanelComponent', () => {
  let component: LoginpanelComponent;
  let fixture: ComponentFixture<LoginpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
