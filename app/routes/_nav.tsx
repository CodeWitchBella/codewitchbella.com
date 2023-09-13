import {
  NavLink,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";

export default function NavRoute() {
  return (
    <Nav>
      <Outlet />
    </Nav>
  );
}

function Nav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col max-w-screen-xl p-5 mx-auto sm:items-center sm:justify-between sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <a
            className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8"
            href="/"
          >
            CodeWitchBella
          </a>
          <button
            className="rounded-lg sm:hidden focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={
            "flex-row flex-grow sm:flex justify-end" +
            (open ? " flex" : " hidden")
          }
        >
          <ul className="list-none inline-flex">
            <NL to="/blog">Blog</NL>
            <NL to="/demos">Demos</NL>
          </ul>
        </nav>
      </div>
      {children}
    </>
  );
}

function NL({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          "px-2 lg:px-6 text-smsm:px-3 block border-b-2 py-3 hover:border-blue-600 hover:text-blue-500" +
          (isActive
            ? " border-blue-600 text-blue-500"
            : " border-transparent text-gray-500")
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Nav>
        <div className="prose mx-auto text-center">
          <h1>
            {error.status} {error.statusText}
          </h1>
        </div>
      </Nav>
    );
  } else if (error instanceof Error) {
    return (
      <Nav>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </Nav>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
