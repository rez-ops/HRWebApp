import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandeMagasinComponent } from './comande-magasin.component';

describe('ComandeMagasinComponent', () => {
  let component: ComandeMagasinComponent;
  let fixture: ComponentFixture<ComandeMagasinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComandeMagasinComponent]
    });
    fixture = TestBed.createComponent(ComandeMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
