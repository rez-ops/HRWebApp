import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeManquantComponent } from './badge-manquant.component';

describe('BadgeManquantComponent', () => {
  let component: BadgeManquantComponent;
  let fixture: ComponentFixture<BadgeManquantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeManquantComponent]
    });
    fixture = TestBed.createComponent(BadgeManquantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
