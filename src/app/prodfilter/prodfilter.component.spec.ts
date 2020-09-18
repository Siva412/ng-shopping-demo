import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdfilterComponent } from './prodfilter.component';

describe('ProdfilterComponent', () => {
  let component: ProdfilterComponent;
  let fixture: ComponentFixture<ProdfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
