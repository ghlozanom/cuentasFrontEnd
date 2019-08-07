import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegistriesComponent } from './new-registries.component';

describe('NewRegistriesComponent', () => {
  let component: NewRegistriesComponent;
  let fixture: ComponentFixture<NewRegistriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRegistriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegistriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
