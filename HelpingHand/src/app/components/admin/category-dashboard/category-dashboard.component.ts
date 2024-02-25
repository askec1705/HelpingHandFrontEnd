import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class CategoryDashboardComponent implements OnInit {

  categories: Category[];
  categoriesLoaded = false;

  ref: DynamicDialogRef;


  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.getCategories().subscribe(
      (result) => {
        if (result.success) {
          this.categories = result.data
          this.categoriesLoaded = true;
        }
      }
    )
  }

  addCategory() {
    this.ref = this.dialogService.open(CategoryAddComponent, {
      header: 'Add Category',
      width: '40%',
      height: '300px',
      contentStyle: { 'overflow': 'auto' }
    });

    this.ref.onClose.subscribe(() => {
      this.getCategories();
    }
    )
  }

  deleteCategory(category: Category) {
    this.confirmationService.confirm({
      key: category.id.toString(),
      message: `Are you sure you want to delete ${category.name}?`,
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoryService.deleteCategory(category).subscribe(
          (result) => {
            if (result.success) {
              this.toastrService.info(result.message,"Delete successful", { timeOut: 10000 });
              this.getCategories();
            }
            else {
              this.toastrService.error(result.message, 'Error');
            }
          }
        )
      }
    });
  }

  editCategory(category: Category) {
    this.ref = this.dialogService.open(CategoryUpdateComponent, {
      header: 'Update ' + category.name,
      width: '40%',
      contentStyle: {'overflow': 'auto' },
      data: category,

    });

    this.ref.onClose.subscribe(() => {
      this.getCategories();
    }
    )
  }





}
