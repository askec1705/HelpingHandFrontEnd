import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../../services/category.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryAddForm : UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  addCategory(){
    this.categoryService.addCategory(this.categoryAddForm.value).subscribe(
      (result)=>{
        if(result.success){
          this.toastrService.success(result.message);
          this.createCategoryAddForm();
        }
        else {
          this.toastrService.error(result.message)
        }
      }
    )
  }

}
