import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPacienteComponent } from './details-paciente.component';

describe('DetailsPacienteComponent', () => {
  let component: DetailsPacienteComponent;
  let fixture: ComponentFixture<DetailsPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
