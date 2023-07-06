import { LogLevel, OpenIdConfiguration } from 'angular-auth-oidc-client';

export const openIdConfiguration: OpenIdConfiguration = {
  authority: 'https://localhost:8080/realms/saveup',
  authWellknownEndpointUrl:
    'http://localhost:8080/realms/saveup/.well-known/openid-configuration',
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: 'frontend',
  scope: 'openid profile email offline_access',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  logLevel: LogLevel.Debug,
  historyCleanupOff: false,
  ignoreNonceAfterRefresh: true,
  secureRoutes: ['http://localhost:1338/'],
};
