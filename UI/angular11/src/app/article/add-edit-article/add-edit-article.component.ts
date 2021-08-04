import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { NotificationService } from 'src/app/notification.service'

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {

  constructor(private service: SharedService, private notificationService: NotificationService) {
    this.id = '';
    this.title = '';
    this.description = '';
    this.categoryId = '';
  }

  @Input() article: any;
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryList: any;

  ngOnInit(): void {
    this.loadCategoryList();
    this.id = this.article.Id;
    this.title = this.article.Title;
    this.description = this.article.Description;
    this.categoryId = this.article.CategoryId;
  }

  loadCategoryList() {
    this.service.getCategoryList()
      .subscribe(
        (data: any) => {
          this.categoryList = data;
        }
      );
  }

  addArticle() {
    const val = { Id: this.id, Title: this.title, Description: this.description, CategoryId: this.categoryId };
    this.service.addArticle(val)
      .subscribe(
        res => {
          this.notificationService.showSuccess('', res.toString());
        },
        error => {
          var errorMessage = '';
          if (error.error.errors.Title) {
            errorMessage = errorMessage + error.error.errors.Title.join(' ');
          }

          if (error.error.errors.Description) {
            errorMessage = errorMessage + error.error.errors.Description.join(' ')
          }

          this.notificationService.showError(
            errorMessage,
            error.error.title
          );
        });
  }

  updateArticle() {
    const articleId = this.id;
    const val = { Id: this.id, Title: this.title, Description: this.description, CategoryId: this.categoryId, CreatedDateTime: this.article.CreatedDateTime };
    this.service.updateArticle(articleId, val)
      .subscribe(
        res => {
          this.notificationService.showSuccess('', res.toString());
        },
        error => {
          this.notificationService.showError(
            error.error.errors.Title.join(' ') + ' ' + error.error.errors.Description.join(' '),
            error.error.title
          );
        });
  }
}
