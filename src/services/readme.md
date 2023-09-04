# Services

In here we can define various services. Not all will be used globally, however, our database-service will be enabled globally (for obvious reasons xD ).

We use barrel pattern as always :)

## Database service

This service is where we define all of our api calls for the user. This is done using the context api from react.

Files:

-   database.d.ts
-   index.ts
-   useDb.tsx
-   useDbContextValue.ts

### index.ts

Export file, not very interesting \***please ignore this**\*

### useDb.ts

Ignore / don't touch this file either, it creates the database-context and creates the usable hook.

Notice the "use client"-statement at the top of the file, this is because we can't use the context hook in a server-component. Instead we declare it as a client-component like with all of our components using states, interactivity and other api-fetching functions.

### useDbContextValue.ts

This is the main file, and the file where we define our functions, states, variables etc.

### database.d.ts

Just a declaration file used as a helper file for finding proper definitions of functions and variables in TypeScript. For each new function, state etc. we want to create need to define the overall type in this file.
