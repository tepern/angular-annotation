import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from '../../models/article';

@Component({
  selector: 'tr[app-table-row-item]',
  templateUrl: './table-row-item.component.html',
  styleUrl: './table-row-item.component.scss',
  standalone: true
})
export class TableRowItemComponent {
  @Input() item: any;
  @Output() onDel = new EventEmitter<string>();
  public del(id: string) {
    this.onDel.emit(id);
  }
}
