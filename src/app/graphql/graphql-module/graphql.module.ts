import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { NgModule } from '@angular/core';

// let hostname = window.location.hostname;
const hostname = 'http://localhost:3000/graphql';

// export function provideApollo(httpLink: HttpLink) {
//     const basic = setContext((operation, context) => ({
//       headers: {
//         Accept: 'charset=utf-8'
//       }
//     }));
  
//     // Get the authentication token from local storage if it exists
//     const token = localStorage.getItem('token');
//     const auth = setContext((operation, context) => ({
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//     }));
  
//     const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
//     const cache = new InMemoryCache();
  
//     return {
//       link,
//       cache
//     }
// }

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink) => {
            return {
              cache: new InMemoryCache(),
              link: httpLink.create({
                uri: hostname
              }),
            };
          },
          deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {

}