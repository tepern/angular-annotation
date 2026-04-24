import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { IArticle } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public readonly article$: BehaviorSubject<IArticle | null> =
    new BehaviorSubject<IArticle | null>(null);

  constructor(private localStorageService: LocalStorageService) {}

  public getById(id: string) {
    const article = this.localStorageService.getItem(id);
    this.article$.next(article);
  }

  public deleteById(id: string) {
    this.localStorageService.deleteId(id);
    this.article$.next(null);
  }
}
