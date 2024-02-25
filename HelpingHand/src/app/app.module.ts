import { ProductAddComponent } from './components/admin/product-dashboard/product-add/product-add.component';
import { ErrorHandleInterceptor } from './interceptors/error-handle.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './components/product/product.component';
import { NaviComponent } from './components/navi/navi.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductProcessComponent } from './components/product-process/product-process.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { TableModule } from 'primeng/table';
import { AdminComponent } from './components/admin/admin.component';
import { ProductDashboardComponent } from './components/admin/product-dashboard/product-dashboard.component';
import { CategoryDashboardComponent } from './components/admin/category-dashboard/category-dashboard.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductUpdateComponent } from './components/admin/product-dashboard/product-update/product-update.component';
import { ApiImagePipe } from './pipes/api-image.pipe';
import { CarouselModule } from 'primeng/carousel';
import { CategoryAddComponent } from './components/admin/category-dashboard/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/admin/category-dashboard/category-update/category-update.component';
import { TimelineModule } from 'primeng/timeline';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { UserDashboardComponent } from './components/admin/user-dashboard/user-dashboard.component';
import { ClaimComponent } from './components/admin/user-dashboard/claim/claim.component';
import { FieldsetModule } from 'primeng/fieldset';




@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NaviComponent,
    ProductDetailComponent,
    ProductProcessComponent,
    ProductUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    ProductDashboardComponent,
    CategoryDashboardComponent,
    ProductAddComponent,
    ApiImagePipe,
    CategoryAddComponent,
    CategoryUpdateComponent,
    UserDashboardComponent,
    ClaimComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ListboxModule,
    AccordionModule,
    SliderModule,
    CheckboxModule,
    GalleriaModule,
    TableModule,
    PanelMenuModule,
    DynamicDialogModule,
    FileUploadModule,
    InputTextareaModule,
    ConfirmDialogModule,
    CarouselModule,
    TimelineModule,
    CalendarModule,
    InputMaskModule,
    FieldsetModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
