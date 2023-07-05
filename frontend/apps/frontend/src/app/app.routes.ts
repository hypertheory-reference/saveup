import { Route } from '@angular/router';


export const appRoutes: Route[] = [
    {
        path: 'dashboard',
        loadChildren: () => import('@startup/dashboard').then(m => m.dashboardRoutes)
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
