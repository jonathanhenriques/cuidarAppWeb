import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarPDFComponent } from './gerar-pdf.component';

describe('GerarPDFComponent', () => {
  let component: GerarPDFComponent;
  let fixture: ComponentFixture<GerarPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
