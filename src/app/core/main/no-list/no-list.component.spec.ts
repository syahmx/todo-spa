import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoListComponent } from './no-list.component';

describe('NoListComponent', () => {
  let component: NoListComponent;
  let fixture: ComponentFixture<NoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
