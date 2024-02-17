import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { inject } from '@angular/core';
import { tap, take } from 'rxjs';

export const authGuard: CanActivateFn = () => { // ограничеваем доступ неавторизованным пользователям
  const authService = inject(AuthService)  
  const router = inject(Router)  
  return authService.authState$.pipe(
    take(1),
    tap((isAuthenticated: any) => {
      if (!isAuthenticated) {
        router.navigate(['/login'])
      }
    }
    )
  );
};
