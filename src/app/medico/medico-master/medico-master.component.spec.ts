import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoMasterComponent } from './medico-master.component';

describe('MedicoMasterComponent', () => {
  let component: MedicoMasterComponent;
  let fixture: ComponentFixture<MedicoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
