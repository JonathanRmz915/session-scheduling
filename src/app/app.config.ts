import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig, inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { provideApollo } from 'apollo-angular';
import { routes } from './app.routes';
import { HttpLink } from 'apollo-angular/http';

const API_URL = 'https://hjddiwebzzfc5f7r7pqmqb4elq.appsync-api.us-east-1.amazonaws.com/graphql';
const API_KEY = 'da2-zuj5w5q2ffg65omiw6eiebjm4i';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = setContext(() => ({
        headers: { 'x-api-key': API_KEY },
      }));

      const http = httpLink.create({ uri: API_URL });

      return {
        link: ApolloLink.from([authLink, http]),
        cache: new InMemoryCache(),
      };
    }),
  ]
};
