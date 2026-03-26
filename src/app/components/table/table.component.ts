import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/article';
import { TableRowItemComponent } from '../table-row-item/table-row-item.component';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [TableRowItemComponent, ArticleComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true
})
export class TableComponent {
  public readonly list$ = new Observable<IArticle[]>();
}
