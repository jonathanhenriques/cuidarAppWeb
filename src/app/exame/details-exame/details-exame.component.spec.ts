import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExameComponent } from './details-exame.component';

describe('DetailsExameComponent', () => {
  let component: DetailsExameComponent;
  let fixture: ComponentFixture<DetailsExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsExameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
