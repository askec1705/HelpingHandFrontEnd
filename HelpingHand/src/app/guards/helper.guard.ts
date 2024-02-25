import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperGuard  {
  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isHelper) {
      return true
    }
    else {
      this.toastrService.error("You need to have helper permissions to access this page.")
      this.router.navigate(['/'])
      return false;
    }
  }

}
