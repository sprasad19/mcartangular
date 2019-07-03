import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyporductComponent } from './myporduct.component';

describe('MyporductComponent', () => {
  let component: MyporductComponent;
  let fixture: ComponentFixture<MyporductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyporductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyporductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
