import { AuthService } from '../../services/auth.service';
import { Process } from '../../models/process';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessService } from '../../services/process.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-product-process',
  templateUrl: './product-process.component.html',
  styleUrls: ['./product-process.component.css']
})
export class ProductProcessComponent implements OnInit {

  pickUpDate: Date;

  today: Date;
  maxDate: Date;

  invalidDates: Date[]
  invalidDatesLoaded = false

  confirmed = false;

  constructor(
    private toastrService: ToastrService,
    private processService: ProcessService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn){
      this.router.navigate(["/"]);
      this.ref.close()
      this.toastrService.info("You need to login to process a product")
    }

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); //Reset todays time to midnight

    this.maxDate = new Date()
    this.maxDate.setDate(this.today.getDate() + 30)

  }

  confirm() {
    if (!this.pickUpDate) {
      this.toastrService.error("Please select pick up date.");
    }
    else {
      this.confirmed = true
    }

    let process: Process = {
      id: 0,
      productId: parseInt(this.config.data.id),
      customerId: this.authService.claims.userId
    }

    this.processService.process(process).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message)
        this.ref.close()
      }
      else {
        this.toastrService.error(result.message)
      }
    });
  }
}
