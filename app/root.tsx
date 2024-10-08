import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import {
  type V2_MetaFunction,
  type LinksFunction,
  type LoaderArgs,
  json,
} from "@remix-run/node";
import css from "./index.css";
import { Nav } from "./components/nav";
import type { ReactNode } from "react";
import { prose } from "./components/css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Isabella Skořepová" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};

export default function App() {
  return (
    <Root>
      <Outlet />
    </Root>
  );
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  return json({ lang: url.pathname === "/" ? "cs" : "en" });
}

function Root({ children }: { children: ReactNode }) {
  const lang = useLoaderData<typeof loader>()?.lang ?? "en";

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/static/cwb.svg" type="image/svg+xml" />
        <link rel="me" href="https://tech.lgbt/@isbl" />
        <link rel="me" href="https://hachyderm.io/@isbl" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Root>
        <Nav>
          <div className={prose + " mx-auto text-center py-8"}>
            <h1>{error.status}</h1>
            <div className="-mt-6">
              {typeof error.data === "string" ? error.data : null}
            </div>
          </div>
        </Nav>
      </Root>
    );
  } else if (error instanceof Error) {
    return (
      <Root>
        <Nav>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </Nav>
      </Root>
    );
  } else {
    return (
      <Root>
        <Nav>
          <h1>Unknown Error</h1>
        </Nav>
      </Root>
    );
  }
}
