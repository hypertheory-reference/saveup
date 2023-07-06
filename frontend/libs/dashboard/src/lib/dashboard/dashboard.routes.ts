import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authInterceptor } from 'angular-auth-oidc-client';
import { DashboardComponent } from './dashboard.component';
import { ChildComponent } from './pages/children/child/child.component';
import { ChildrenComponent } from './pages/children/children.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { FEATURE_NAME, reducers } from './state';
import * as childJobsEffects from './state/effects/child-jobs.effects';
import * as childrenMapperCommandsEffects from './state/effects/children.effects';
import * as featureEffects from './state/effects/feature.effects';
import * as jobsEffects from './state/effects/jobs.effects';
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
      provideHttpClient(withInterceptors([authInterceptor()])),
    ],
  },
];
