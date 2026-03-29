import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, of, concat, combineLatest } from 'rxjs';
import { switchMap, shareReplay, mergeMap, concatMap } from 'rxjs/operators';
import { IArticle } from '../../models/article';
import { TableRowItemComponent } from '../table-row-item/table-row-item.component';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-table',
  imports: [TableRowItemComponent, ArticleComponent, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [LocalStorageService, ArticleService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TableComponent {
  protected readonly localStorageService = inject(LocalStorageService);
  protected readonly articleService = inject(ArticleService);
  public readonly resultList$ = this.localStorageService.list$;
  protected readonly list$: BehaviorSubject<IArticle[]|null> = new BehaviorSubject<IArticle[]|null>(null);
  constructor() {
    this.localStorageService.setList();
    of(void 0)
      .pipe(
        switchMap(() => this.resultList$),
      )
      .subscribe(this.list$);   
  }
  protected open(id: string) {
    this.articleService.getById(id); 
  }

  protected onDel(id: string) {
    this.articleService.deleteById(id);
  }
}
