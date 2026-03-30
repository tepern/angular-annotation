import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Form, ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { IArticle } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  protected readonly articleForm: FormGroup;
  protected readonly article$: BehaviorSubject<IArticle|null> = new BehaviorSubject<IArticle|null>(null);
  protected edit: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document, private localStorage: LocalStorageService, private articleService: ArticleService) {
    this.articleForm = new FormGroup({
      "articleTitle": new FormControl('New article', Validators.required),
      "articleContent": new FormControl('', Validators.maxLength(500)),
    });
    this.article$ = this.articleService.article$;
  }

  protected submit() {
    const article: IArticle = {
      id: this.articleForm.controls.id ? this.articleForm.controls.id.value : crypto.randomUUID(),
      title: this.articleForm.controls.articleTitle.value,
      content: this.articleForm.controls.articleContent.value
    }
    this.localStorage.setItem(article.id, article);
    this.localStorage.setIds(article.id);
    this.localStorage.setList();
    this.articleForm.controls.articleContent.reset();
    this.edit = false;
  }

  protected editArticle(article: IArticle) {
    this.edit = true;
    this.articleForm.patchValue({
      id: article.id,
      articleTitle: article.title,
      articleContent: article.content
    })
  }

  protected cancel() {
    this.edit = false;
  }

  protected selection() {
    const selection = this.document.getSelection();
    if (selection && selection.rangeCount > 0) {
      console.log('test', selection);
    }
    
  }
}

