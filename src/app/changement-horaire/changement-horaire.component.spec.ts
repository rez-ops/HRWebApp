import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementHoraireComponent } from './changement-horaire.component';

describe('ChangementHoraireComponent', () => {
  let component: ChangementHoraireComponent;
  let fixture: ComponentFixture<ChangementHoraireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangementHoraireComponent]
    });
    fixture = TestBed.createComponent(ChangementHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
