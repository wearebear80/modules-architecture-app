# Example App based on modules archichecture

## Motivation

In many react-redux examples, we can see the following architecture:
```
/src
  /components
  /containers
  /pages
  /reducers
  /actions
  App.ts
```
It's good, but in my opinion, it has some drawbacks.
As my application became bigger, I always have faced the problem of messed code.
In "classic" architecture our code is composed by the principle of technical functionality.
For example: reducers, containers, actions. And when you have to work with some business-entities
, you need to find parts of them in one of the many "technical" directory (reducers, containers, actions). It's very unuseful when you have a huge number of business-entities.
What is even more important, when working in team on a large application, at some point
I have seen difficult code cohesion between business-entities which none of the developers could control.

Domain driven design by Eric Evans made me think about "domain-area" in my apps.
I started separating code by "domain" and tried to reduce code cohesion.

## Сoncept & patterns

PAGES - argegetes (components + modules) linked on route, usually fill full screen

MODULES - part of the application based on "domain"(for example: chat, auth), with api, ui, redux-state

About modules:
```
Every module has its own part of the redux-state.
Every redux-action in module has module-prefix (for example, in auth-module: export const SET_PASSWORD = 'auth/SET_PASSWORD')

If we need to change module state from another module, we need to use adapterSaga pattern only.In adapterSaga we convert outer action-type
from another module to inner module action-type(see src/modules/chat/adapterSaga)

If we need to get a part of module state in another module, we need to use selectors pattern.

NOTE: this patterns help us to contol isolation of modules from each other.
```

Module archichecture
```
/api
 - reducers - reducer handlers working with API
 - endpoints - api urls
/reducers - reducer handlers working with "offline" state
/ui - components and ui 
/saga - we can use classic saga in module if we need
/adapterSaga
/selectors  
```

COMPONENTS - dump-components (like ui-kit)