import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestInicioComponent } from './test-inicio';

describe('TestInicioComponent', () => {
  let component: TestInicioComponent;
  let fixture: ComponentFixture<TestInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
