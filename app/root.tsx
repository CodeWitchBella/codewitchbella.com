import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { V2_MetaFunction, LinksFunction } from "@remix-run/node";
import css from "./index.css";
import { Nav } from "./components/nav";
import type { ReactNode } from "react";

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

function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/static/cwb.svg" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
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
          <div className="prose mx-auto text-center py-8">
            <h1>{error.status}</h1>
            <div className="-mt-8">
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
