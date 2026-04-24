import { Component, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAnnotation } from '../../models/annotation';
import { IArticle } from '../../models/article';
import { LocalStorageService } from '../../services/local-storage.service';
import { ArticleService } from '../../services/article.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-annotation',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss',
})
export class AnnotationComponent {
  protected readonly annotationForm: FormGroup;
  public readonly fragment = input.required<Selection>();
  protected readonly article$: BehaviorSubject<IArticle | null> =
    new BehaviorSubject<IArticle | null>(null);
  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private articleService: ArticleService,
  ) {
    this.article$ = this.articleService.article$;
    this.annotationForm = formBuilder.group({
      annotationContent: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  public submit() {
    if (this.article$.value === null) {
      return;
    } else {
      const annotation: IAnnotation = {
        id: crypto.randomUUID(),
        articleId: this.article$.value.id,
        fragment: this.fragment(),
        annotation: this.annotationForm.controls.annotationContent.value,
      };
      this.localStorage.setItem<IAnnotation>(annotation.id, annotation);
    }
  }
}
