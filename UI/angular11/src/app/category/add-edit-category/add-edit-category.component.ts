import { Component, OnInit, Input, resolveForwardRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { NotificationService } from 'src/app/notification.service'

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  constructor(private service: SharedService, private notificationService: NotificationService) {
    this.id = '';
    this.name = '';
  }

  @Input() category: any;
  id: string;
  name: string;

  ngOnInit(): void {
    this.id = this.category.Id;
    this.name = this.category.Name;
  }

  addCategory() {
    const val = { Id: this.id, Name: this.name };
    this.service.addCategory(val)
      .subscribe(
        res => {
          this.notificationService.showSuccess("", res.toString());
        },
        error => {
          this.notificationService.showError(
            error.error.errors.Name.join(' '),
            error.error.title
          );
        });
  }

  updateCategory() {
    const categoryId = this.id;
    const val = { Id: this.id, Name: this.name, CreatedDateTime: this.category.CreatedDateTime };
    this.service.updateCategory(categoryId, val)
      .subscribe(
        res => {
          this.notificationService.showSuccess("", res.toString());
        },
        error => {
          this.notificationService.showError(
            error.error.errors.Name.join(' '),
            error.error.title
          );
        });
  }
}
