import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  category: Category;

  categoryUpdateForm: UntypedFormGroup;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.createCategoryUpdateForm();
  }

  createCategoryUpdateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      id: [this.category.id, [Validators.required]],
      name: [this.category.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  getCategory() {
    this.category = this.dynamicDialogConfig.data;
  }

  updateCategory() {
    this.categoryService.updateCategory(this.categoryUpdateForm.value).subscribe(
      (result) => {
        if (result.success) {
          this.toastrService.success(result.message);
        }
        else {
          this.toastrService.error(result.message)
        }
      }
    )
  }


}
