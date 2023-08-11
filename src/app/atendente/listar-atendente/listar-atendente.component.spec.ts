import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtendenteComponent } from './listar-atendente.component';

describe('ListarAtendenteComponent', () => {
  let component: ListarAtendenteComponent;
  let fixture: ComponentFixture<ListarAtendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAtendenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAtendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
