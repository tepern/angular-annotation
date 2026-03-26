import { Component } from '@angular/core';
import { Form, ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  public readonly articleForm: FormGroup;
  constructor() {
    this.articleForm = new FormGroup({
      "articleTitle": new FormControl('New article', Validators.required),
      "articleContent": new FormControl('', Validators.maxLength(500)),
    })
  }

  public submit() {
    console.log(this.articleForm);
  }
}
