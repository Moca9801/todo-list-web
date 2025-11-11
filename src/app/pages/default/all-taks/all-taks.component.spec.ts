import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaksComponent } from './all-taks.component';

describe('AllTaksComponent', () => {
  let component: AllTaksComponent;
  let fixture: ComponentFixture<AllTaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTaksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
