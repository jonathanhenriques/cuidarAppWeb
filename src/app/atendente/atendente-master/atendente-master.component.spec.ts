import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendenteMasterComponent } from './atendente-master.component';

describe('AtendenteMasterComponent', () => {
  let component: AtendenteMasterComponent;
  let fixture: ComponentFixture<AtendenteMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtendenteMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendenteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
