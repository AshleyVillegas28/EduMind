import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthInfoDialog } from './auth-info-dialog';
import { MatDialogRef } from '@angular/material/dialog';

describe('AuthInfoDialog', () => {
  let component: AuthInfoDialog;
  let fixture: ComponentFixture<AuthInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInfoDialog],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
