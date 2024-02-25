
import { UserDashboardComponent } from './components/admin/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';



import { CategoryDashboardComponent } from './components/admin/category-dashboard/category-dashboard.component';
import { ProductDashboardComponent } from './components/admin/product-dashboard/product-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { NotLoginGuard } from './guards/not-login.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelperGuard } from './guards/helper.guard';

const routes: Routes = [
  { path: "", component: ProductComponent },
  { path: "products", component: ProductComponent },
  { path: "product/:productId", component: ProductDetailComponent },
  { path: "login", component: LoginComponent, canActivate: [NotLoginGuard] },
  { path: "register", component: RegisterComponent, canActivate: [NotLoginGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [LoginGuard] },
  {
    path: "admin", component: AdminComponent, canActivate: [LoginGuard, AdminGuard], children: [
      {
        path: "products", component: ProductDashboardComponent
      },
      {
        path: "categories", component: CategoryDashboardComponent
      },
      {
        path: "users", component: UserDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
