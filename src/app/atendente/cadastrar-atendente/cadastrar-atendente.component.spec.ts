import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAtendenteComponent } from './cadastrar-atendente.component';

describe('CadastrarAtendenteComponent', () => {
  let component: CadastrarAtendenteComponent;
  let fixture: ComponentFixture<CadastrarAtendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarAtendenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAtendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
