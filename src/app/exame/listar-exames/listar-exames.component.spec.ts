import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExamesComponent } from './listar-exames.component';

describe('ListarExamesComponent', () => {
  let component: ListarExamesComponent;
  let fixture: ComponentFixture<ListarExamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarExamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarExamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
