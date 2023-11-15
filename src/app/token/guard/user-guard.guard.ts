import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {getCookie} from "../utils/cooke.utils";

@Injectable({
  providedIn: 'root',
})

export class userGuard implements CanActivate{

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = getCookie('token');
    return token !== null;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
