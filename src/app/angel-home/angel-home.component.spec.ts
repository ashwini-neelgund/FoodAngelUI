import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngelHomeComponent } from './angel-home.component';

describe('AngelHomeComponent', () => {
  let component: AngelHomeComponent;
  let fixture: ComponentFixture<AngelHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngelHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
