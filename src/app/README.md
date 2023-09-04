## App router

All files in this folder are treated as Server-components, which are pre-rendered on the server. These components CANNOT be interactive, i.e. use onClick, use hooks and states (useEffect, useState etc.).<br>
To make a component interactive we can use the statement `"use client"` at the very top of our component. This will mark it as a client-component which can use hooks, states etc.

### Files

In the `app` directory some file names are reserved and rendered in a certain order. These files gets rendered in the following order:

-   layout.tsx
-   template.tsx
-   error.tsx
-   loading.tsx
-   not-found.tsx
-   page.tsx / nested layout.tsx

The layout file defines a standard layout for the page in the directory as well as all subroutes to the file-location. NOTE: nested layouts are possible, but is generally a bad idea.

The error page displays a fallback page in case the app encounters an error on load defined as a react error-boundary.

Not-found is basically the same as the error but is specifically for 404-http error.

The loading page is a "placeholder" for content while it is loading, this can be used to display a loading bar or whatnot. Extension of react suspense, which we don't have to implement.

The page is just the main component or screen the user will see. It's defined as "children": ReactNode in the layout file and should generally hold this convention.

### Standard Routing

Any sub-folder within this directory corresponds to a url-endpoint.
Each of the folders has to contain at least a `page.tsx` file.<br>
This means that the file-path `app/route/page.tsx` corresponds to the url: `localhost:3000/route` and file-path `app/route/subroute/page.tsx` creates the url: `localhost:3000/route/subroute`

### Route Groups

To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. `(route)`). The file-path `app/(route)/page.tsx` will render the URL as `localhost:3000/`, and folder-path `app/(route)/subroute/page.tsx` will render URL: `localhost:3000/subroute`.

This property is useful if we don't want to have a lot of routes extended from the root. We can for example have a file path `app/(user)/profile/page.tsx` and `app/(admin)/account/page.tsx` where the routes are only routed as `.../profile` and `.../account`.

### Dynamic Routes

Dynamic routes can be created by wrapping a subfolder in square brackets for example `[id]`. The segments are passed as `params` to the page.<br>

#### Example

Displaying a specific item in a list can be done with following route `app/item/[id]/page.tsx` where `[id]` is the items id.

```ts
const Page = ({ params }: { params: { id: string } }) => {
	return <div>Item: {params.id}</div>;
};

export default Page;
```

#### Catch-all Segments

Catch-all segments are created by adding an ellipsis in the folder-name i.e. `[...slug]`, for example the file-path `app/storage/[...slug]/page.tsx` will match `.../storage/items` but also `.../storage/items/computers` and `.../storage/items/computers/brands`.

### Parallel Routes

Parallel routing allows us to simultaneously or conditionally render one or more pages in the same layout. To make a parallel route we add a "@" in front of the folder-name e.g. `@item`.

#### Example

Rendering two pages at the same time can be done in the following way:<br>
Create two routes `app/@profile/page.tsx` and `app/@basket/page.tsx`.
In `app/layout.tsx` add the following code:

```ts
const Layout = (props: {
	children: React.ReactNode;
	analytics: React.ReactNode;
	team: React.ReactNode;
}) => {
	<>
		{props.children}
		{props.profile}
		{props.basket}
	</>;
};

export default Layout;
```

### Intercepting Routes

Intercepting routes allows you to load a route within the current layout while keeping the context for the current page.

-   (.) to match segments on the same level
-   (..) to match segments one level above
-   (..)(..) to match segments two levels above
-   (...) to match segments from the root app directory

This allows us to open a route on a modal component if we want, for example a login-page.

We can intercept the `image` route from within the `items` route by intercepting it creating a route `app/items/[id]/(..)image`. We can then use the image in a modal as such:

```ts
// app/image/[id]/page.tsx
const ImagePage = ({ params }: { params: { id: string } }) => {
	const img = images.find((i) => i.id === params.id);

	return <Image img={img} />;
};

export default PhotoPage;
```

```ts
// app/items/@modal/[id]/page.tsx
const ImagePage = ({ params }: { params: { id: string } }) => {
	const img = images.find((i) => i.id === params.id);

	return (
		<Modal>
			<Image img={img} />
		</Modal>
	);
};

export default PhotoPage;
```

### API Routes

These are nested inside the `app/api` directory. Each of the routes includes a `route.ts` file, where we can define and handle our HTTP-requests. These requests are defined functions which HAS to be named after the method we want to use these are: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` and `OPTIONS`, where options are autogenerated with defaults if not defined. If an unsupported method is called the server wil respond with `405 Method Not Allowed`.

**NOTE**: a `page.ts` and a `route.ts` in the same directory will conflict with each other. When we create API-routes keep them in separate groups, for example in `app/api` for the API and anything else for the actual pages as this is standard.

#### Example

```ts
// app/api/exampleuser/route.ts
export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const addUser = await prisma.exampleUser.create({
		data: {
			...body,
		},
	});

	return NextResponse.json({ addUser });
};
```

We request this route by fetching the api using a backend-service request (may be changed for tRPC **_TODO_**).
The request is handled in the database context which will be globally accessible.

```ts
// services/database/useDbContextValue.ts
const createExampleUser = useCallback(async (name: string, email: string) => {
	const client = await genApiClient();

	const newUser = { name, email };

	// important to cast as ExampleUser otherwise live-updating won't work
	const usr: ExampleUser = (await client.postRequest(
		"exampleuser",
		newUser
	)) as ExampleUser;

	setExampleUsers([...exampleUsers, usr]);
}, []);
```

### Authentication/Authorization

[Next-Auth Docs](https://next-auth.js.org)

A token is stored in a session in the form of a [JWT](https://jwt.io). The JWT can be read as json and used for displaying user info such as profile-pic, username, email etc. The session is stored on the server and is accessed with `getServerSession`.

```ts
// app/(home)/page.tsx
import { getServerSession } from "next-auth";

...
const session = await getServerSession(authOptions);
...
	<div>
		<img src={session?.user?.image} alt="pic" />
		<p>{session?.user?.name}</p>
		<p>{session?.user?.email}</p>
	</div>
...
	// If no session is available display login-buttons
	{!session ? (
		<div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-6">
			<DiscordButton />
			<GithubButton />
		</div>
	) : (
		// If authenticated display logout-button
		<SignOutButton />
	)}

```
