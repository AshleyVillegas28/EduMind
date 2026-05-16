import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestResultadoComponent } from './test-resultado';

describe('TestResultadoComponent', () => {
  let component: TestResultadoComponent;
  let fixture: ComponentFixture<TestResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestResultadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
