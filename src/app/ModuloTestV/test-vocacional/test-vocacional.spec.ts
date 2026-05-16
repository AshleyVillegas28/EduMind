import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestVocacionalComponent } from './test-vocacional';

describe('TestVocacionalComponent', () => {
  let component: TestVocacionalComponent;
  let fixture: ComponentFixture<TestVocacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestVocacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestVocacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
