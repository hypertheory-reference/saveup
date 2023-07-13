import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authInterceptor } from 'angular-auth-oidc-client';
import { DashboardComponent } from './dashboard.component';
import { ChildDetailsComponent } from './pages/home/components/child-details.component';
import { HomeComponent } from './pages/home/home.component';
import { FEATURE_NAME, reducers } from './state';
import * as childJobsEffects from './state/child-jobs/child-jobs.effects';
import { ChildrenEventToCommandEffects } from './state/children/effects/children-event-to-command.effects';
import * as dashboardEffects from './state/dashboard/dashboard.effects';
import * as featureEffects from './state/feature.effects';
import * as jobsEffects from './state/jobs/jobs.effects';
import { RouterEffects } from './state/router.effects';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        
      },
      {
        path: 'child/:id',
        component: ChildDetailsComponent,
      },

      {
        path: '**',
        redirectTo: 'home',
      },
    ],
    providers: [
      provideState(FEATURE_NAME, reducers),
      ReactiveFormsModule,
      provideEffects(
        featureEffects,
        jobsEffects,
        childJobsEffects,
        dashboardEffects,
        RouterEffects,
        ChildrenEventToCommandEffects,
      ),
      provideHttpClient(withInterceptors([authInterceptor()])),
    ],
  },
];
