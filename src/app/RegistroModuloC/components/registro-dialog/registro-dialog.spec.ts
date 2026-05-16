import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDialog } from './registro-dialog';
import { MatDialogRef } from '@angular/material/dialog';

describe('RegistroDialog', () => {
  let component: RegistroDialog;
  let fixture: ComponentFixture<RegistroDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDialog],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
