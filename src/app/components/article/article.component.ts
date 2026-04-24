import { Component, effect, Inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { IArticle } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { AnnotationComponent } from '../annotation/annotation.component';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  Observable,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AnnotationComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  protected readonly articleForm: FormGroup;
  protected readonly article$: BehaviorSubject<IArticle | null> =
    new BehaviorSubject<IArticle | null>(null);
  protected edit: boolean = false;
  protected annotate = signal<boolean>(false);
  protected showAnnotationForm = signal<boolean>(false);
  public fragment: Selection | null = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorage: LocalStorageService,
    private articleService: ArticleService,
  ) {
    this.articleForm = new FormGroup({
      articleTitle: new FormControl('New article', Validators.required),
      articleContent: new FormControl('', Validators.maxLength(500)),
    });
    this.article$ = this.articleService.article$;
    effect(() => console.log(this.annotate()));
    this.article$.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.annotate.set(false);
      }),
    );
  }

  protected submit() {
    const article: IArticle = {
      id: this.articleForm.controls.id
        ? this.articleForm.controls.id.value
        : crypto.randomUUID(),
      title: this.articleForm.controls.articleTitle.value,
      content: this.articleForm.controls.articleContent.value,
    };
    this.localStorage.setItem<IArticle>(article.id, article);
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
      articleContent: article.content,
    });
  }

  protected cancel() {
    this.edit = false;
    this.annotate.set(false);
  }

  protected selection() {
    const selection = this.document.getSelection();
    if (selection && !selection.isCollapsed) {
      this.annotate.set(true);
      this.fragment = selection;
    } else {
      this.annotate.set(false);
    }
  }

  protected annotateFragment() {
    this.showAnnotationForm.set(true);
  }
}
