import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzonAnonimo } from './buzon-anonimo';

describe('BuzonAnonimo', () => {
  let component: BuzonAnonimo;
  let fixture: ComponentFixture<BuzonAnonimo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuzonAnonimo],
    }).compileComponents();

    fixture = TestBed.createComponent(BuzonAnonimo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
