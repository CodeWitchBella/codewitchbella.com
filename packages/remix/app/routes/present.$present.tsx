import Present, { isValidRoute } from '~/components/present/present'
import { Suspense } from 'react'
import { useParams } from "@remix-run/react";
import { ClientOnly, Loading } from '~/components/client-only'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: '/vendor/katex-0.9.0/katex.min.css',
    },
  ]
}

export default function PresentRoute() {
  const param = useParams().present
  if (!isValidRoute(param) || !param)
    throw new Response('Not Found', { status: 404 })
  return (
    <ClientOnly>
      <Suspense fallback={<Loading />}>
        <Present route={param} />
      </Suspense>
    </ClientOnly>
  )
}
