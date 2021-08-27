import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSearchComponentComponent } from './auto-search-component.component';

describe('AutoSearchComponentComponent', () => {
  let component: AutoSearchComponentComponent;
  let fixture: ComponentFixture<AutoSearchComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSearchComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
