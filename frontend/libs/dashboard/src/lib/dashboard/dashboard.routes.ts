import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authInterceptor } from 'angular-auth-oidc-client';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { FEATURE_NAME, reducers } from './state';
import * as childJobsEffects from './state/child-jobs/child-jobs.effects';
import * as childrenMapperCommandsEffects from './state/children/children.effects';
import * as dashboardEffects from './state/dashboard/dashboard.effects';
import * as featureEffects from './state/feature.effects';
import * as jobsEffects from './state/jobs/jobs.effects';

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
        path: '**',
        redirectTo: 'home',
      },
    ],
    providers: [
      provideState(FEATURE_NAME, reducers),
      ReactiveFormsModule,
      provideEffects(
        childrenMapperCommandsEffects,
        featureEffects,
        jobsEffects,
        childJobsEffects,
        dashboardEffects
      ),
      provideHttpClient(withInterceptors([authInterceptor()])),
    ],
  },
];
