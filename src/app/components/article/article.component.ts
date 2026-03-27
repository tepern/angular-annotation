import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { IArticle } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ArticleService],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  public readonly articleForm: FormGroup;
  protected readonly article$: BehaviorSubject<IArticle|null> = new BehaviorSubject<IArticle|null>(null);
  constructor(private localStorage: LocalStorageService, private articleService: ArticleService) {
    this.articleForm = new FormGroup({
      "articleTitle": new FormControl('New article', Validators.required),
      "articleContent": new FormControl('', Validators.maxLength(500)),
    });
    this.article$ = this.articleService.article$;
  }

  public submit() {
    const article: IArticle = {
      id: crypto.randomUUID(),
      title: this.articleForm.controls.articleTitle.value,
      content: this.articleForm.controls.articleContent.value
    }
    this.localStorage.setItem(article.id, article);
    this.localStorage.setIds(article.id);
    this.localStorage.setList();
    this.articleForm.controls.articleContent.reset();
  }
}

