import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authInterceptor } from 'angular-auth-oidc-client';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { FEATURE_NAME, reducers } from './state';
import * as childJobsEffects from './state/effects/child-jobs.effects';
import * as childrenMapperCommandsEffects from './state/effects/children.effects';
import * as dashboardEffects from './state/effects/dashboard.effects';
import * as featureEffects from './state/effects/feature.effects';
import * as jobsEffects from './state/effects/jobs.effects';
import { ChildComponent } from './pages/children/child/child.component';
export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      
            {
              path: 'child/:id',
              component: ChildComponent,
            },
      {
        path: '**',
        redirectTo: 'home'
      }
      // {
      //   path: 'children',
      //   component: ChildrenComponent,
      //   children: [
      //     {
      //       path: 'child/:id',
      //       component: ChildComponent,
      //     },
      //   ],
      // },
      // {
      //   path: 'jobs',
      //   component: JobsComponent,
      // },
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
