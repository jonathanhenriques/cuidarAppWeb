import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMasterComponent } from './local-master.component';

describe('LocalMasterComponent', () => {
  let component: LocalMasterComponent;
  let fixture: ComponentFixture<LocalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
