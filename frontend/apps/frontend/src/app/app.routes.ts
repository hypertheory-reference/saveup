import { inject } from '@angular/core';
import { CanActivateFn, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserLoggedIn } from './state';


export const appRoutes: Route[] = [
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('@startup/dashboard').then(m => m.dashboardRoutes)
    }
];

export function authGuard(): CanActivateFn {
    return () => {
        const isLoggedIn = inject(Store).selectSignal(selectUserLoggedIn);
        return isLoggedIn();
    }
}