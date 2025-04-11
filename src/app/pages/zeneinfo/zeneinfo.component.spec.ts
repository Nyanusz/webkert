import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeneinfoComponent } from './zeneinfo.component';

describe('ZeneinfoComponent', () => {
  let component: ZeneinfoComponent;
  let fixture: ComponentFixture<ZeneinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZeneinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZeneinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
