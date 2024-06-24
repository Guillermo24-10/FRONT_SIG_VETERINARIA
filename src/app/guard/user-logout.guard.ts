import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../demo/service/auth.service';

@Injectable({
  providedIn: 'root'
})

class PermissionsService {

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
  }

  canActivate(): boolean {
    if (!this.authService.isLogued()) {
      return true;
    } else {
      this.route.navigate(["/"])
      return false;
    }
  }
}

export const userLogoutGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
