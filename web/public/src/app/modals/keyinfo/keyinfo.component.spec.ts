import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyinfoComponent } from './keyinfo.component';

describe('KeyinfoComponent', () => {
  let component: KeyinfoComponent;
  let fixture: ComponentFixture<KeyinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
