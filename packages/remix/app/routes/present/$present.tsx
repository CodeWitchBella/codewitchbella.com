import Present, { isValidRoute } from '@codewitchbella.com/present'
import styles from 'katex/dist/katex.min.css'
import { Suspense, useEffect } from 'react'
import { useParams } from 'remix'
import { ClientOnly, Loading, patchWindow } from '~/components/client-only'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function PresentRoute() {
  const param = useParams().present
  if (!isValidRoute(param)) throw new Response('Not Found', { status: 404 })
  return (
    <ClientOnly onBeforeLoad={patchWindow}>
      <Suspense fallback={<Loading />}>
        <Present route={param} />
      </Suspense>
    </ClientOnly>
  )
}
