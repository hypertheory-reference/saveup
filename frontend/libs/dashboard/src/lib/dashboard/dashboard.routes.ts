import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, ResolveFn, Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { Store, provideState } from '@ngrx/store';
import { authInterceptor } from 'angular-auth-oidc-client';
import { DashboardComponent } from './dashboard.component';
import { ChildComponent } from './pages/children/child/child.component';
import { HomeComponent } from './pages/home/home.component';
import { FEATURE_NAME, reducers, selectChildModel } from './state';
import * as childJobsEffects from './state/child-jobs/child-jobs.effects';
import { ChildrenEntity } from './state/children';
import * as childrenMapperCommandsEffects from './state/children/children.effects';
import * as dashboardEffects from './state/dashboard/dashboard.effects';
import * as featureEffects from './state/feature.effects';
import * as jobsEffects from './state/jobs/jobs.effects';

const childResolver: ResolveFn<ChildrenEntity | undefined> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(Store).select(
    selectChildModel(route.paramMap.get('id') || undefined)
  );
};
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
        component: ChildComponent,
        resolve: {child: childResolver}
      },
      {
        path: '**',
        redirectTo: 'home',
      },
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

