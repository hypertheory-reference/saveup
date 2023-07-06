import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DashboardComponent } from './dashboard.component';
import { ChildComponent } from './pages/children/child/child.component';
import { ChildrenComponent } from './pages/children/children.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { FEATURE_NAME, reducers } from './state';
import * as childrenMapperCommandsEffects from './state/effects/children.effects';
import * as featureEffects from './state/effects/feature.effects';
import * as jobsEffects from './state/effects/jobs.effects';
import * as childJobsEffects from './state/effects/child-jobs.effects';
import { AuthInterceptor } from 'angular-auth-oidc-client';
export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'children',
        component: ChildrenComponent,
        children: [],
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'child/:id',
        component: ChildComponent,
      },
    ],
    providers: [
      provideState(FEATURE_NAME, reducers),
      ReactiveFormsModule,
      provideEffects(
        childrenMapperCommandsEffects,
        featureEffects,
        jobsEffects,
        childJobsEffects
      ),
      provideHttpClient(),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
  },
];
