import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { NotificationService } from 'src/app/notification.service'

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  constructor(private service: SharedService, private notificationService: NotificationService) {
    this.modalTitle = '';
    this.activateAddEditCategoryComponent = false;
    this.category = Object;
    this.categoryResultList = [];
    this.numberOfCategories = 0;
    this.currentPage = 1;
    this.itemsPerPage = 25;
    this.searchText = '';
  }

  modalTitle: string;
  activateAddEditCategoryComponent: boolean;
  category: any;
  categoryResultList: any[];
  numberOfCategories: number;
  currentPage: number;
  itemsPerPage: number;
  searchText: string;

  ngOnInit(): void {
    this.getNumberOfCategories();
    this.loadCategoryResultList({ PageIndex: this.currentPage, PageSize: this.itemsPerPage, SearchTerm: this.searchText });
  }

  public pageChanged(newPage: any) {
    this.currentPage = newPage;
    this.getNumberOfCategories();
    this.loadCategoryResultList({ PageIndex: this.currentPage, PageSize: this.itemsPerPage, SearchTerm: this.searchText });
  }

  getNumberOfCategories() {
    this.service.currentCategoryNumber({ SearchTerm: this.searchText }).subscribe((data: any) => {
      this.numberOfCategories = data;
    });
  }

  addClick() {
    this.category = {
      Id: 0,
      Name: ''
    }
    this.modalTitle = 'Add Category';
    this.activateAddEditCategoryComponent = true;
  }

  editClick(item: any) {
    this.category = item;
    this.modalTitle = 'Edit Category';
    this.activateAddEditCategoryComponent = true;
  }

  deleteClick(item: any) {
    this.category = item;
  }

  confirmDeleteCategory() {
    this.service.deleteCategory(this.category.Id)
      .subscribe(
        data => {
          this.notificationService.showSuccess('', data.toString());
          this.loadCategoryResultList({ PageIndex: 1, PageSize: 25, SearchTerm: '' });
        },
        error => {
          this.notificationService.showError(
            '',
            error.error.title
          );
          this.loadCategoryResultList({ PageIndex: 1, PageSize: 25, SearchTerm: '' });
        });
  }

  closeClick() {
    this.activateAddEditCategoryComponent = false;
    this.loadCategoryResultList({ PageIndex: 1, PageSize: 25, SearchTerm: '' });
  }

  loadCategoryResultList(data: any) {
    this.getNumberOfCategories();
    this.service.getCategories(data).subscribe((data: any) => {
      this.categoryResultList = data;
    });
  }
}
