import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Scripts } from 'remix'

export function ClientOnly({
  onBeforeLoad,
  children,
}: PropsWithChildren<{ onBeforeLoad?: () => void }>) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    onBeforeLoad?.()
    setLoading(false)
  }, [onBeforeLoad])
  if (process.env.NODE_ENV) {
    const beforeLoadRef = useRef(onBeforeLoad)
    if (beforeLoadRef.current !== onBeforeLoad) {
      throw new Error('onBeforeLoad should be stable')
    }
  }
  if (loading)
    return (
      <>
        <Scripts />
        <Loading />
      </>
    )
  return (
    <>
      <Scripts />
      {children}
    </>
  )
}

export function Loading() {
  return <div>Loading...</div>
}

export function patchWindow() {
  window.global = window
}
