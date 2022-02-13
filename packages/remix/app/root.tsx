import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import type { MetaFunction } from 'remix'

export const meta: MetaFunction = () => {
  return { title: 'Isabella Skořepová' }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: '/vendor/inter-3.19/inter.css',
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/cwb.svg?3" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
