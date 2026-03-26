import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowItemComponent } from './table-row-item.component';

describe('TableRowItemComponent', () => {
  let component: TableRowItemComponent;
  let fixture: ComponentFixture<TableRowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRowItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
