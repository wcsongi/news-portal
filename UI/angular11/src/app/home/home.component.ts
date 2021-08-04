import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { NotificationService } from 'src/app/notification.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: SharedService, private notificationService: NotificationService) {
    this.modalTitle = '';
    this.activateAddEditArticleComponent = false;
    this.article = Object;
    this.categoryList = [];
    this.articleResultList = [];
    this.numberOfArticles = 0;
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.searchText = '';
  }

  modalTitle: string;
  activateAddEditArticleComponent: boolean;
  article: any;
  categoryList: any[];
  articleResultList: any[];
  numberOfArticles: number;
  currentPage: number;
  itemsPerPage: number;
  searchText: string;

  ngOnInit(): void {
    this.loadCategoryList();
    this.getNumberOfArticles();
    this.loadArticleResultList({ PageIndex: this.currentPage, PageSize: this.itemsPerPage, SearchTerm: this.searchText });
  }

  public pageChanged(newPage: any) {
    this.currentPage = newPage;
    this.getNumberOfArticles();
    this.loadArticleResultList({ PageIndex: this.currentPage, PageSize: this.itemsPerPage, SearchTerm: this.searchText });
  }

  loadCategoryList() {
    this.service.getCategoryList().subscribe((data: any) => {
      this.categoryList = data;
    });
  }

  getNumberOfArticles() {
    this.service.currentArticleNumber({ SearchTerm: this.searchText }).subscribe((data: any) => {
      this.numberOfArticles = data;
    });
  }

  showCategoryName(categoryId: any) {
    var value: any;

    if (this.categoryList.length > 0)
      this.categoryList.forEach((item: any) => {
        if (item.Id === categoryId)
          value = item.Name;
      });

    return value;
  }

  addClick() {
    this.article = {
      Id: 0,
      Title: '',
      Description: '',
      CategoryId: 0
    }
    this.modalTitle = 'Add Article';
    this.activateAddEditArticleComponent = true;
  }

  editClick(item: any) {
    this.article = item;
    this.modalTitle = 'Edit Article';
    this.activateAddEditArticleComponent = true;
  }

  deleteClick(item: any) {
    this.article = item;
  }

  confirmDeleteArticle() {
    this.service.deleteArticle(this.article.Id)
      .subscribe(
        data => {
          this.notificationService.showSuccess('', data.toString());
          this.loadArticleResultList({ PageIndex: 1, PageSize: 5, SearchTerm: '' });
        },
        error => {
          this.notificationService.showError(
            '',
            error.error.title
          );
          this.loadArticleResultList({ PageIndex: 1, PageSize: 5, SearchTerm: '' });
        });
  }

  closeClick() {
    this.activateAddEditArticleComponent = false;
    this.loadArticleResultList({ PageIndex: 1, PageSize: 5, SearchTerm: '' });
  }

  loadArticleResultList(data: any) {
    this.getNumberOfArticles();
    this.service.getArticles(data).subscribe((data: any) => {
      this.articleResultList = data;
    });
  }
}