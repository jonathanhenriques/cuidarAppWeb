import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarExameComponent } from './cadastrar-exame.component';

describe('CadastrarExameComponent', () => {
  let component: CadastrarExameComponent;
  let fixture: ComponentFixture<CadastrarExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarExameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
