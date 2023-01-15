import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullrecordComponent } from './fullrecord.component';

describe('FullrecordComponent', () => {
  let component: FullrecordComponent;
  let fixture: ComponentFixture<FullrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullrecordComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FullrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
