import { Injectable } from '@angular/core';
import { IArticle } from '../models/article';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public list$: BehaviorSubject<IArticle[]|null> = new BehaviorSubject<IArticle[]|null>(null);
  public item$: BehaviorSubject<IArticle|null> = new BehaviorSubject<IArticle|null>(null);
  
  constructor() {
   }

  public setItem(key: string, value: IArticle) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): IArticle|null {
    const val = localStorage.getItem(key);
    const item = val ? JSON.parse(val) : null;
    return item;
  }

  public getList() {
    const ids: string[]|null = this.getIds();
    let list: IArticle[] = [];
    if(ids !== null && Array.isArray(ids)) {
      ids.forEach(id => {
        const article = this.getItem(id);
        if(article !== null) {
          list.push(article);
        }
      });
    }
    return list;
  }

  public setList() {
    const list = this.getList();
    this.list$.next(list);
  }
  
  public setIds(id: string) {
    const ids = this.getIds();
    if (ids && Array.isArray(ids)) {
      ids.push(id);
      localStorage.setItem('article', JSON.stringify(ids));
    } else {
      localStorage.setItem('article', JSON.stringify([id]));
    }
  }

  public getIds(): string[]|null {
    const val = localStorage.getItem('article');
    const ids = val ? JSON.parse(val) : null;
    return ids;
  }

  public updateList(article: IArticle) {
    console.log('vvv', article);
    this.item$.next(article);
    this.item$.getValue();
  }

  public deleteId(id: string) {
    const ids = this.getIds();
    const newIds = ids?.filter((item)=>item! == id);
    localStorage.setItem('article', JSON.stringify(newIds));
  }
}
