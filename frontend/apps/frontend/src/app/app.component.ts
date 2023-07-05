import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'saveup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  oidcSecurityService = inject(OidcSecurityService);

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((auth) => {
      console.log('app authenticated', auth.isAuthenticated)
      if (!auth.isAuthenticated) {
        this.oidcSecurityService.authorize();
      }
    });
  }
}
