import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestEjecucionComponent } from './test-ejecucion';

describe('TestEjecucionComponent', () => {
  let component: TestEjecucionComponent;
  let fixture: ComponentFixture<TestEjecucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEjecucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
